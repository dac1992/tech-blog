---
title: MyBatis 与数据访问
description: MyBatis 数据映射框架及 Spring Data JPA 对比。
---

## MyBatis

灵活的 SQL 映射框架，平衡了自动化与手动控制。

### 注解方式

```java
@Mapper
public interface UserMapper {
    @Select("SELECT * FROM users WHERE id = #{id}")
    User findById(Long id);

    @Select("SELECT * FROM users WHERE name LIKE CONCAT('%', #{keyword}, '%')")
    List<User> search(String keyword);

    @Insert("INSERT INTO users(name, email) VALUES(#{name}, #{email})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(User user);

    @Update("UPDATE users SET name=#{name}, email=#{email} WHERE id=#{id}")
    void update(User user);

    @Delete("DELETE FROM users WHERE id = #{id}")
    void delete(Long id);
}
```

### XML 映射方式

适合复杂 SQL：

```xml
<mapper namespace="com.example.mapper.UserMapper">
    <resultMap id="userResult" type="User">
        <id property="id" column="id"/>
        <result property="name" column="name"/>
        <collection property="orders" ofType="Order"
                    select="findOrdersByUserId" column="id"/>
    </resultMap>

    <select id="findById" resultMap="userResult">
        SELECT * FROM users WHERE id = #{id}
    </select>

    <select id="findOrdersByUserId" resultType="Order">
        SELECT * FROM orders WHERE user_id = #{userId}
    </select>
</mapper>
```

## Spring Data JPA

基于 Hibernate 的 ORM，以面向对象方式操作数据库：

```java
public interface UserRepository extends JpaRepository<User, Long> {
    // 方法名派生查询
    List<User> findByNameContaining(String keyword);

    Optional<User> findByEmail(String email);

    // 自定义 JPQL
    @Query("SELECT u FROM User u WHERE u.age > :minAge")
    List<User> findByAgeGreaterThan(@Param("minAge") int minAge);
}
```

## 对比选择

| 特性 | MyBatis | Spring Data JPA |
|------|---------|----------------|
| SQL 控制 | 完全手动 | 自动生成 + 自定义 |
| 学习曲线 | 较低 | 较高 |
| 复杂查询 | 灵活方便 | 需额外处理 |
| 跨数据库 | SQL 需适配 | 方言自动切换 |
| 适合场景 | 复杂业务查询 | 标准 CRUD 为主 |
