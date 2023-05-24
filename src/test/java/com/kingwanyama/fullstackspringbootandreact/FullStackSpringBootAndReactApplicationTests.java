package com.kingwanyama.fullstackspringbootandreact;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

class FullStackSpringBootAndReactApplicationTests {
	Calculator underTest = new Calculator();
	@Test
	void itShouldAddTwoNumbers() {
		//Given
		int numberOne = 20;
		int numberTwo = 30;
		//When
		int result = underTest.add(numberOne, numberTwo);
		//Then
		int expected = 50;
		assertThat(result).isEqualTo(expected);
	}

	static class Calculator{
		int add(int a, int b){
			return a+b;
		}
	}

}
