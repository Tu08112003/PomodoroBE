import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Types } from 'mongoose';

export interface JwtRefreshPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(configService: ConfigService) {
    const secret = configService.get<string>('jwt.refreshSecret');
    if (!secret) {
      throw new Error('JWT_REFRESH_SECRET is required');
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.refreshToken || null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.refreshSecret'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: JwtRefreshPayload) {
    if (!payload.sub || !Types.ObjectId.isValid(payload.sub)) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const refreshToken = request?.cookies?.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }
    return { sub: payload.sub, email: payload.email, refreshToken };
  }
}
