export interface Lesson {
  id: number;
  moduleId: number;
  title: string;
  contentType: 'Vídeo' | 'Texto' | 'Quiz';
  contentUrl: string;
  durationMinutes: number;
  order: number;
}

export interface Module {
  id: number;
  courseId: number;
  title: string;
  order: number;
  lessons?: Lesson[];
}

export interface CourseDetail extends Course {
  modules?: Module[];
}