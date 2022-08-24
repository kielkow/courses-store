import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateCustomerParams {
  authUserId: string;
}

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  getCustomerByAuthUserId(authUserId: string) {
    return this.prisma.customer.findUnique({ where: { authUserId } });
  }

  async createCustomer({ authUserId }: CreateCustomerParams) {
    const customerWithSameAuthUserId = await this.prisma.customer.findUnique({
      where: {
        authUserId,
      },
    });

    if (customerWithSameAuthUserId) {
      throw new Error('Customer with this auth_user_id already exists');
    }

    return this.prisma.customer.create({
      data: { authUserId },
    });
  }
}
