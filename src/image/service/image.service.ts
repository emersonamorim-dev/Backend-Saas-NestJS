import { Injectable, NotFoundException } from '@nestjs/common';
import * as sharp from 'sharp';
import { promises as fsPromises } from 'fs';
import { resolve as pathResolve } from 'path';
import { Image } from '../model/image.model'; // Importe o modelo Image

@Injectable()
export class ImageService {
  async generateImage(prompts: string, photoCount: number, photoSize: string): Promise<string> {
    // Exemplo hipotético de geração de imagem usando sharp
    const outputImagePath = pathResolve(__dirname, `../images/generated_${Date.now()}.jpg`);

    await sharp({ create: { width: 800, height: 600, channels: 3, background: 'white' } })
      .composite([{ input: 'path/to/your/image.jpg', gravity: 'center' }])
      .resize(800, 600)
      .toFile(outputImagePath);

    return outputImagePath;
  }

  async getImage(id: string): Promise<Image> {
    try {
      const imagePath = pathResolve(__dirname, `../images/${id}.jpg`); // Substitua pelo caminho real
      const imageBuffer = await fsPromises.readFile(imagePath);
      const image: Image = {
        id: id,
        filename: `${id}.jpg`,
        size: imageBuffer.length,
        createdAt: new Date() // Pode ajustar isso conforme necessário
      };
      return image;
    } catch (error) {
      throw new NotFoundException('Image not found');
    }
  }

  async getAllImages(): Promise<Image[]> {
    try {
      const imageDirectory = pathResolve(__dirname, '../images'); // Substitua pelo caminho real
      const imageFiles = await fsPromises.readdir(imageDirectory);

      const images: Image[] = imageFiles.map((filename, index) => ({
        id: `${index + 1}`, // Pode usar um valor mais adequado
        filename: filename,
        size: 0, // Você pode calcular o tamanho do arquivo aqui, se necessário
        createdAt: new Date() // Pode ajustar isso conforme necessário
      }));

      return images;
    } catch (error) {
      return [];
    }
  }

  async deleteImage(id: string): Promise<void> {
    try {
      const imagePath = pathResolve(__dirname, `../images/${id}.jpg`); // Substitua pelo caminho real
      await fsPromises.unlink(imagePath);
    } catch (error) {
      throw new NotFoundException('Image not found');
    }
  }
}

