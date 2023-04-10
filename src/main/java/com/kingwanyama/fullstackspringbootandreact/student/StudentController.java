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
                new Student(1L, "King", "king@gmail.com", Gender.MALE),
                new Student(2L, "King", "king@gmail.com", Gender.MALE));
        return students;
    }
}
