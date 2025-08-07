import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/tour-category.entity';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepo.create(createCategoryDto);
    return this.categoryRepo.save(category);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepo.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async update(id: number, updateDto: UpdateCategoryDto): Promise<Category> {
    await this.findOne(id); // Ensure it exists
    await this.categoryRepo.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.categoryRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Category not found');
    }
  }
}
