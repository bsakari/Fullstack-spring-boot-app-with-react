package com.kingwanyama.fullstackspringbootandreact.student;

import com.kingwanyama.fullstackspringbootandreact.student.exception.BadRequestException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class StudentServiceTest {
    @Mock
    private StudentRepository studentRepository;
    private StudentService underTest;
    @BeforeEach
    void setUp() {
        underTest = new StudentService(studentRepository);
    }


    @Test
    void canGetAllStudents() {
        //When
        underTest.getAllStudents();
        //Then
        verify(studentRepository).findAll();
    }

    @Test
    void canAddStudent() {
        //Given
        Student student = new Student("King","king@gmail.com",Gender.MALE);
        //When
        underTest.addStudent(student);
        //Then
        ArgumentCaptor<Student> argumentCaptor = ArgumentCaptor.forClass(Student.class);
        verify(studentRepository).save(argumentCaptor.capture());
        Student captorStudent = argumentCaptor.getValue();
        assertThat(captorStudent).isEqualTo(student);
    }

    @Test
    void willThrowWhenEmailIsTaken() {
        //Given
        Student student = new Student("King","king@gmail.com",Gender.MALE);

        given(studentRepository.selectExistsEmail(student.getEmail())).willReturn(true);
        //When
        //Then
        assertThatThrownBy(()->underTest.addStudent(student))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining("Email "+student.getEmail()+" taken");
        verify(studentRepository,never()).save(any());
    }

    @Test
    @Disabled
    void deleteStudent() {
    }
}