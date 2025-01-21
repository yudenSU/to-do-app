import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import Pagination from '../components/Pagination';

const onPrev = vi.fn();
const onNext = vi.fn();

test('Test pagination renders succesfully', () => {
    render(
        <Pagination current={2} total={10} onPrev={onPrev} onNext={onNext}/>
    );

    const text = screen.getByText('Page 2 of 10');
    const back = screen.getByTitle('previous');
    const next = screen.getByTitle('next');

    expect(text).toBeInTheDocument();
    expect(back).toBeInTheDocument();
    expect(next).toBeInTheDocument();
});

test('Test pagination callbacks', () => {
    render(
        <Pagination current={2} total={10} onPrev={onPrev} onNext={onNext}/>
    );

    const back = screen.getByTitle('previous');
    const next = screen.getByTitle('next');

    fireEvent.click(back);
    expect(onPrev).toHaveBeenCalledTimes(1);
    fireEvent.click(next);
    expect(onNext).toHaveBeenCalledTimes(1);
    
});