package com.kingwanyama.fullstackspringbootandreact.student;

import lombok.*;

//@Data we are not using data because we don't want to make some fields final
@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    private Long id;
    private String name;
    private String email;
    private Gender gender;
}
