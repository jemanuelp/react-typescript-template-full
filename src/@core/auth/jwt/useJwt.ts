import JwtService from './jwtService';
import {JWTConfig} from "../../../domains/interfaces/JWTConfig";
import JWT_DEFAULT_CONFIG from "./jwtDefaultConfig";

export default function useJwt(
    jwtOverrideConfig: JWTConfig = JWT_DEFAULT_CONFIG
): JwtService {
  return new JwtService(jwtOverrideConfig);
}
