import { render, act } from '@testing-library/react';
import { JourneyProvider, useJourney } from '../src';

describe('JourneyProvider', () => {
  it('should throw error when used outside JourneyProvider', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const TestComponent = () => {
      useJourney();
      return null;
    };

    expect(() => render(<TestComponent />)).toThrow('useJourney must be used within a JourneyProvider');

    consoleErrorSpy.mockRestore();
  });

  it('should handle completing a step without starting a journey', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const onComplete = jest.fn();

    const TestComponent = () => {
      const { completeStep } = useJourney();

      act(() => {
        completeStep('journey1', 'step1');
      });

      return null;
    };

    render(
      <JourneyProvider>
        <TestComponent />
      </JourneyProvider>
    );

    // expect(consoleErrorSpy).toHaveBeenCalledWith('useJourney must be used within a JourneyProvider');
    // expect(() => render(<TestComponent />)).toThrow('useJourney must be used within a JourneyProvider');
    // expect(onComplete).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});