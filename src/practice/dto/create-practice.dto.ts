import { IsInt, Length, Max, Min } from 'class-validator';

export class CreatePracticeDto {
  @Length(10, 20, {
    message(args) {
      console.log(args);
      const { targetName, property, value, constraints } = args;
      return `${targetName} 类的 ${property} 属性的值 ${value} 不满足约束: ${constraints.join(',')}`;
    },
  })
  name: string;

  @IsInt()
  @Min(18)
  @Max(60)
  age: number;
}
