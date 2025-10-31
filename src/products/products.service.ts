import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductDto) {
    return this.prisma.product.create({ data });
  }

  async findAll() {
    return this.prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id }});
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: number, data: UpdateProductDto) {
    await this.findOne(id); // lanzará 404 si no existe
    return this.prisma.product.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.product.delete({ where: { id }});
  }
}
