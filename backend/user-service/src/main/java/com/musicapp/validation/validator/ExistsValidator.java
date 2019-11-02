package com.musicapp.validation.validator;

import com.musicapp.validation.annotation.Exists;
import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.support.Repositories;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * Валидатор для проверки существования сущности
 *
 * @author evgeniycheban
 */
public class ExistsValidator implements ConstraintValidator<Exists, Object> {
    private final Repositories repositories;

    /**
     * @param listableBeanFactory - фабрика бинов Spring Framework
     */
    @Autowired
    public ExistsValidator(ListableBeanFactory listableBeanFactory) {
        this.repositories = new Repositories(listableBeanFactory);
    }

    private Class<?> entity;
    private String field;

    private boolean exists;

    /**
     * {@inheritDoc}
     */
    @Override
    public void initialize(Exists existsConstraint) {
        this.entity = existsConstraint.entity();
        this.field = existsConstraint.field();
        this.exists = existsConstraint.exists();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        }

        JpaSpecificationExecutor<?> executor = repositories.getRepositoryFor(entity)
                .filter(repository -> repository instanceof JpaSpecificationExecutor)
                .map(repository -> (JpaSpecificationExecutor<?>) repository)
                .orElseThrow(() -> new IllegalArgumentException("No repository found for type: " + entity.getSimpleName())); 
        long count = executor.count((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(field), value));

        return (count == 1) == exists;
    }

}
