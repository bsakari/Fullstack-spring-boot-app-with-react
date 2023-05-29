package com.kingwanyama.fullstackspringbootandreact.student;

import com.kingwanyama.fullstackspringbootandreact.student.exception.BadRequestException;
import com.kingwanyama.fullstackspringbootandreact.student.exception.StudentNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class StudentService {
    private final StudentRepository studentRepository;

    public List<Student> getAllStudents(){
        return studentRepository.findAll();
    }

    public void addStudent(Student student){
        if (studentRepository.selectExistsEmail(student.getEmail()))
            throw new BadRequestException("Email "+student.getEmail()+" taken");
        studentRepository.save(student);
    }

    public void deleteStudent(Long id){
        if (!studentRepository.existsById(id))
            throw new StudentNotFoundException("Student not found");
        studentRepository.deleteById(id);
    }

}
