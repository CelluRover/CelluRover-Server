import { Test, TestingModule } from '@nestjs/testing';
import { SessionHandlerGateway } from './session-handler.gateway';

describe('SessionHandlerGateway', () => {
  let gateway: SessionHandlerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionHandlerGateway],
    }).compile();

    gateway = module.get<SessionHandlerGateway>(SessionHandlerGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
