import { Music } from '../src/models/music';

describe('Music Model', () => {
    let music: Music;

    beforeEach(() => {
        music = new Music({ title: 'Test Title', tags: 'pop', makeInstrumental: false, mv: 'sonic-v3-5' });
    });

    test('should create a music object with the correct properties', () => {
        expect(music.title).toBe('Test Title');
        expect(music.tags).toBe('pop');
        expect(music.makeInstrumental).toBe(false);
    });

    test('should allow updating the title', () => {
        music.title = 'New Title';
        expect(music.title).toBe('New Title');
    });

    test('should allow updating the tags', () => {
        music.tags = 'rock';
        expect(music.tags).toBe('rock');
    });

    test('should allow setting makeInstrumental to true', () => {
        music.makeInstrumental = true;
        expect(music.makeInstrumental).toBe(true);
    });
});