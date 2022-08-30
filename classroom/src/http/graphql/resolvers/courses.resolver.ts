import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { CoursesService } from 'src/services/courses.service';
import { Course } from '../models/course';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private coursesService: CoursesService) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => [Course])
  courses() {
    return this.coursesService.listAllCourses();
  }
}
