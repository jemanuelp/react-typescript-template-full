import JwtService from './jwtService';
import {JWTConfig} from "../../../domains/interfaces/JWTConfig";

export default function useJwt(jwtOverrideConfig: JWTConfig) {
  const jwt = new JwtService(jwtOverrideConfig);

  return {
    jwt
  };
}
