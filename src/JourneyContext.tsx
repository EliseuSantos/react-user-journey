import React, {createContext, useContext, useState, useCallback, ReactNode, useEffect} from 'react';

interface StepDetail {
    step: string;
    endTime: number;
    duration: number;
}

interface Journey {
    steps: string[];
    completedSteps: StepDetail[];
    startTime: number;
    status: 'inProgress' | 'completed';
    metadata?: any;
    onCompletion: (details: {
        journeyName: string;
        totalDuration: number;
        status: string;
        completedSteps: StepDetail[]
    }) => void;
    onAbandonment: (details: { journeyName: string; status: string }) => void;
}

interface Journeys {
    [key: string]: Journey;
}

interface JourneyContextType {
    journeys: Journeys;
    startJourney: (name: string, steps: string[], onCompletion?: Journey['onCompletion'], onAbandonment?: Journey['onAbandonment'], metadata?: any) => void;
    completeStep: (name: string, step: string) => void;
}

const JourneyContext = createContext<JourneyContextType | undefined>(undefined);

export const JourneyProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [journeys, setJourneys] = useState<Journeys>(() => {
        const savedJourneys = sessionStorage.getItem('journeys');
        return savedJourneys ? JSON.parse(savedJourneys) : {};
    });

    useEffect(() => {
        sessionStorage.setItem('journeys', JSON.stringify(journeys));
    }, [journeys]);

    const startJourney: JourneyContextType['startJourney'] = useCallback((name, steps, onCompletion = () => {
    }, onAbandonment = () => {
    }, metadata = {}) => {
        const startTime = Date.now();
        setJourneys(prev => ({
            ...prev,
            [name]: {steps, completedSteps: [], startTime, status: 'inProgress', metadata, onCompletion, onAbandonment}
        }));
    }, []);


    const completeStep: JourneyContextType['completeStep'] = useCallback((name, step) => {
        setJourneys(prev => {
            const journey = prev[name];
            if (!journey || journey.status !== 'inProgress') return prev;

            const now = Date.now();
            const stepIndex = journey.steps.indexOf(step);
            const lastStepTime = journey.completedSteps[stepIndex - 1]?.endTime || journey.startTime;
            const stepDuration = now - lastStepTime;
            const updatedCompletedSteps = [...journey.completedSteps, {step, endTime: now, duration: stepDuration}];

            const isCompleted = journey.steps.length === updatedCompletedSteps.length;
            if (isCompleted && journey.onCompletion && typeof journey.onCompletion === 'function') {
                journey.onCompletion({
                    journeyName: name,
                    totalDuration: now - journey.startTime,
                    status: 'completed',
                    completedSteps: updatedCompletedSteps,
                });
            }

            return {
                ...prev,
                [name]: {
                    ...journey,
                    completedSteps: updatedCompletedSteps,
                    status: isCompleted ? 'completed' : 'inProgress',
                },
            };
        });
    }, []);

    return (
        <JourneyContext.Provider value={{journeys, startJourney, completeStep}}>
            {children}
        </JourneyContext.Provider>
    );
};

export const useJourney = (): JourneyContextType => {
    const context = useContext(JourneyContext);
    if (context === undefined) {
        throw new Error('useJourney must be used within a JourneyProvider');
    }
    return context;
};
