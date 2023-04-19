package com.kingwanyama.fullstackspringbootandreact.student;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/students")
public class StudentController {
    @GetMapping
    List<Student> getAllStudents() {
        List<Student> students = Arrays.asList(
                new Student(1L, "King1", "king1@gmail.com", Gender.MALE),
                new Student(2L, "King2", "king2@gmail.com", Gender.MALE),
                new Student(3L, "King3", "king3@gmail.com", Gender.MALE),
                new Student(4L, "King4", "king4@gmail.com", Gender.MALE),
                new Student(5L, "Jane", "jane@gmail.com", Gender.FEMALE)
        );
        return students;
    }
}
