import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const features = [
    {
        title: 'Personalized Itineraries',
        description: `Preppy's AI-driven tool creates personalized mock interviews based
                      of the information you feed it. From a Junior frontend developer
                      role to a role that requires an experienced accountant preppy's got
                      you covered.`,
        date: 'Feature 1',
        iconColor: '#040D12', 
        bgColor: '#1e2a38',
        borderColor: '#00337C'
    },
    {
        title: 'Supports Multiple Formats',
        description: 'Export your data in various formats such as CSV, JSON, or Excel.',
        date: 'Feature 2',
        iconColor: '#040D12',
        bgColor: '#0f172a',
        borderColor: '#00337C'
    },
    {
        title: 'Customizable Scraping Rules',
        description: 'Define custom rules to tailor the scraping process according to your needs.',
        date: 'Feature 3',
        iconColor: '#040D12', 
        bgColor: '#112240',
        borderColor: '#00337C'
    },
    {
        title: 'Real-Time Data Updates',
        description: 'Get real-time updates as data is scraped and processed.',
        date: 'Feature 4',
        iconColor: '#040D12', 
        bgColor: '#0f172a',
        borderColor: '#00337C'
    }
];

const FeaturesSection = () => {
    return (
        <section id="features" className="bg-[#040D12] py-20">
            <h2 className="text-4xl font-bold text-center text-white mb-12">Features</h2>
            <VerticalTimeline>
                {features.map((feature, index) => (
                    <VerticalTimelineElement
                        key={index}
                        className="vertical-timeline-element--work"
                        contentStyle={{
                            background: `linear-gradient(to right, ${feature.bgColor}, #040D12)`,
                            color: '#fff',
                            borderRadius: '12px',
                            padding: '20px',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                        contentArrowStyle={{ borderRight: `7px solid ${feature.borderColor}` }}
                        date={feature.date}
                        iconStyle={{ background: feature.iconColor, color: '#fff' }}
                    >
                        <h3 className="vertical-timeline-element-title text-2xl font-semibold mb-4">{feature.title}</h3>
                        <p className="text-lg">{feature.description}</p>
                    </VerticalTimelineElement>
                ))}
            </VerticalTimeline>
        </section>
    );
};

export default FeaturesSection;
