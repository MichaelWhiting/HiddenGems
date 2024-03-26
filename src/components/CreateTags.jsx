import React, { useState } from 'react';
import axios from 'axios';

function CreateTag({ onTagCreated }) {
    const [tagName, setTagName] = useState('');
    const [categories, setCategories] = useState({
        food: false,
        adventure: false,
        entertainment: false,
        technology: false,
        travel: false,
        education: false,
        health: false,
        fashion: false,
        fitness: false,
        pet: false,
        family: false,
        arts: false,
    });

    const handleCheckboxChange = event => {
        const { name, checked } = event.target;
        setCategories(prevState => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const response = await axios.post('/createTag', {
                tagName,
                categories,
            });
            console.log('Tag created:', response.data);
            onTagCreated(response.data); // Notify parent component
            // Clear input fields or show success message
        } catch (error) {
            console.error('Error creating tag:', error);
            // Handle error, e.g., show an error message
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            
            <div>
                <label>
                    <input type="checkbox" name="food" checked={categories.food} onChange={handleCheckboxChange}/>
                    Food
                </label>
                <label> <input type="checkbox" name="adventure" checked={categories.adventure} onChange={handleCheckboxChange}/> Adventure </label>
                <label>
                    <input
                        type="checkbox"
                        name="entertainment"
                        checked={categories.entertainment}
                        onChange={handleCheckboxChange}
                    />
                    Entertainment
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="technology"
                        checked={categories.technology}
                        onChange={handleCheckboxChange}
                    />
                    Technology
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="travel"
                        checked={categories.travel}
                        onChange={handleCheckboxChange}
                    />
                    travel
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="education"
                        checked={categories.education}
                        onChange={handleCheckboxChange}
                    />
                    Education
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="health"
                        checked={categories.health}
                        onChange={handleCheckboxChange}
                    />
                    Health
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="fashion"
                        checked={categories.fashion}
                        onChange={handleCheckboxChange}
                    />
                    Fashion
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="fitness"
                        checked={categories.fitness}
                        onChange={handleCheckboxChange}
                    />
                    Fitness
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="pet"
                        checked={categories.pet}
                        onChange={handleCheckboxChange}
                    />
                    Pet
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="family"
                        checked={categories.family}
                        onChange={handleCheckboxChange}
                    />
                    Family
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="arts"
                        checked={categories.arts}
                        onChange={handleCheckboxChange}
                    />
                    Arts
                </label>

                
            </div>
            
        </form>
    );
}

export default CreateTag;
