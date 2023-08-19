import { Controller, Post, Body, Get, Param, Delete, NotFoundException } from '@nestjs/common';
import { ImageService } from '../service/image.service';
import { Image } from '../model/image.model'; // Importe o modelo Image

@Controller('image-generation')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('generate')
  async generateImage(@Body() data: any): Promise<string> {
    const { prompts, photoCount, photoSize } = data;
    const generatedImage = await this.imageService.generateImage(prompts, photoCount, photoSize);
    return generatedImage;
  }

  @Get(':id')
  async getImage(@Param('id') id: string): Promise<Image> {
    const image = await this.imageService.getImage(id);
    return image;
  }

  @Get()
  async getAllImages(): Promise<Image[]> {
    const images = await this.imageService.getAllImages();
    return images;
  }

  @Delete(':id')
  async deleteImage(@Param('id') id: string): Promise<void> {
    try {
      await this.imageService.deleteImage(id);
    } catch (error) {
      throw new NotFoundException('Image not found');
    }
  }
}




