interface PreparationStepsProps {
    steps: string[];
}

export function PreparationSteps({ steps }: PreparationStepsProps) {
    return (
        <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">作り方</h2>
            <div className="space-y-4">
                {steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                            {index + 1}
                        </div>
                        <p className="text-gray-600 pt-1">{step}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}