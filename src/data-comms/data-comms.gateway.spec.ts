import { Test, TestingModule } from '@nestjs/testing';
import { DataCommsGateway } from './data-comms.gateway';

describe('DataCommsGateway', () => {
  let gateway: DataCommsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataCommsGateway],
    }).compile();

    gateway = module.get<DataCommsGateway>(DataCommsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
