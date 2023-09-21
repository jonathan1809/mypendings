// Place environment related test setup code here
import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "text-encoding";

global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;
