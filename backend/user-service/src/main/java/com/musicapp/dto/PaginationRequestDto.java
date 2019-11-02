package com.musicapp.dto;

/**
 * DTO запроса с параметрами пагинации
 *
 * @author evgeniycheban
 */
public class PaginationRequestDto {
    private Integer page;
    private Integer size;

    /**
     * @return страница
     */
    public Integer getPage() {
        return page - 1;
    }

    /**
     * @param page - страница
     */
    public void setPage(Integer page) {
        this.page = page;
    }

    /**
     * @return размер страницы
     */
    public Integer getSize() {
        return size;
    }

    /**
     * @param size - размер страницы
     */
    public void setSize(Integer size) {
        this.size = size;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String toString() {
        return "PaginationRequestDto{" +
                "page=" + page +
                ", size=" + size +
                '}';
    }
}
