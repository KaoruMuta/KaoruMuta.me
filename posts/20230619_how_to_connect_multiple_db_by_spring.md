---
title: 'Spring Bootで複数DBに接続する際の注意点'
date: 2023-06-19 12:00
categories: 技術 Spring
---

## 概要

Spring Boot で複数 DB に接続する際に少し詰まったので、備忘録代わりに書く。

## 詳細

今回、MySQLとPostgreSQLの二つを一モジュールから繋がないといけないケースを想定する。

JDBCとJPAでどのように実現できるかを検証した。([プロジェクト](https://github.com/KaoruMuta/springboot_practice/tree/master/multipledb))

### JDBC

まずは設定ファイル(YAML/Property file)にDBの設定情報を指定する。

```yaml
spring:
  datasource:
    mysql:
      jdbc-url: jdbc:mysql://localhost:3306/sample_db
      username: dbuser
      password: userpass
      driver-class-name: com.mysql.cj.jdbc.Driver
    postgresql:
      jdbc-url: jdbc:postgresql://localhost:5432/sample_db
      username: dbuser
      password: userpass
      driver-class-name: org.postgresql.Driver
```

一つだけDBに繋ぐ際とは異なり、`spring.datasource`以下に各種パラメータを設定するのではなく、繋ぐDBごとに設定を行うのが大きな変更点。（今回なら、`spring.datasource.mysql`/`spring.datasource.postgresql`）

そして、設定ファイルを読み込みDatasourceを構成する。

_\*一つだけ繋ぐ場合、`spring.datasource`以下にパラメータを定義することで、自動的にDatasourceを構成してくれる ([DataSourceProperties.java](https://github.com/spring-projects/spring-boot/blob/v3.1.4/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/jdbc/DataSourceProperties.java))_

```java
@Configuration
public class JdbcDataSourceConfig {

    @Bean("mysqlJdbcDataSource")
    @ConfigurationProperties("spring.datasource.mysql")
    @Primary
    public DataSource mysqlDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean("postgresqlJdbcDataSource")
    @ConfigurationProperties("spring.datasource.postgresql")
    public DataSource postgresqlDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean("mysql")
    public JdbcTemplate createMysqlDataSource(@Qualifier("mysqlJdbcDataSource") DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }

    @Bean("postgresql")
    public JdbcTemplate createPostgresqlDataSource(@Qualifier("postgresqlJdbcDataSource") DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
}
```

### JPA

設定ファイルに関してはJDBCと同様に定義。

そしてDatasourceの定義に関しても独自でやるところは同様だが、大きく変わるところは、

- transactionManagerをもう一つのDBと異なるユニットで定義
- entityが格納されたパッケージの指定（基本的にはもう一つのDBと異なるEntityのはずなので、違ったパッケージを指定することが多いかも）

```java
@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        basePackages = "com.example.multipledb.repository.mysql",
        entityManagerFactoryRef = "mysqlEntityManagerFactory",
        transactionManagerRef = "mysqlTransactionManager"
)
public class MysqlJpaDataSourceConfig {

    @Bean
    @ConfigurationProperties("spring.datasource.mysql")
    public DataSource mysqlJpaDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean
    @Primary
    public LocalContainerEntityManagerFactoryBean mysqlEntityManagerFactory(
            EntityManagerFactoryBuilder builder,
            @Qualifier("mysqlJpaDataSource") DataSource dataSource
    ) {
        return builder
                .dataSource(dataSource)
                .packages("com.example.multipledb.entity.mysql")
                .persistenceUnit("mysqlTransactionManager")
                .build();
    }

    @Bean
    public JpaTransactionManager mysqlTransactionManager(
            @Qualifier("mysqlEntityManagerFactory") LocalContainerEntityManagerFactoryBean mysqlEntityManagerFactory
    ) {
        return new JpaTransactionManager(Objects.requireNonNull(mysqlEntityManagerFactory.getObject()));
    }
}
```

## まとめ

基本的には、それぞれ繋ぎたいDBの設定を書いて、独自でConfigを構成するだけ（ただ、JDBCに関しては自動で設定してくれることもあり、若干戸惑うかも）

## 参考記事

- https://www.baeldung.com/spring-boot-configure-multiple-datasources
