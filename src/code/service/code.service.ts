import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { Code } from '../model/code.model';


@Injectable()
export class CodesService {
  constructor(private readonly prisma: PrismaService) {}

  // Create
  async create(data: Prisma.CodeCreateInput): Promise<Code> {
    return this.prisma.code.create({ data });
  }

  // Read all
  async findAll(): Promise<Code[]> {
    return this.prisma.code.findMany();
  }

  // Read one by ID
  async findOne(id: number): Promise<Code> {
    return this.prisma.code.findUnique({ where: { id } });
  }

  // Update
  async update(id: number, data: Prisma.CodeUpdateInput): Promise<Code> {
    return this.prisma.code.update({
      where: { id },
      data,
    });
  }

  // Delete
  async delete(id: number): Promise<void> {
    await this.prisma.code.delete({ where: { id } });
  }
}
