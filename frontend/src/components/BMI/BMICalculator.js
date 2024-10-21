import React, { useState } from 'react';
import './BMICalculator.css';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import Breadcrumb from '../Breadcrumb';
const BMICalculator = () => {
    const [height, setHeight] = useState('');
    const [heightUnit, setHeightUnit] = useState('cm');
    const [weight, setWeight] = useState('');
    const [weightUnit, setWeightUnit] = useState('kg');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [bmi, setBmi] = useState(null);
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const breadcrumbLinks = [
        { href: '/', text: 'Home' },
        { href: '#', text: 'Pages' },
    ];
    const calculateBMI = (e) => {
        e.preventDefault();
        setError('');

        // Validate required fields
        if (!height || !weight) {
            setError('Height and weight are required fields.');
            return;
        }

        // Convert height and weight to metric
        const heightInMeters = heightUnit === 'cm' ? height / 100 : ((height * 12) + (height % 1)) * 0.0254; // feet and inches to meters
        const weightInKg = weightUnit === 'kg' ? weight : weight / 2.20462; // pounds to kg

        const calculatedBmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2);
        setBmi(calculatedBmi);
        setStatus(getWeightStatus(calculatedBmi));
    };

    const getWeightStatus = (bmi) => {
        if (bmi < 18.5) return 'Underweight';
        if (bmi >= 18.5 && bmi < 25) return 'Healthy';
        if (bmi >= 25 && bmi < 30) return 'Overweight';
        return 'Obese';
    };

    return (
        <>
            <Navbar />
            <Breadcrumb title="BMI Calculator" links={breadcrumbLinks} />
            <div className="bmi-calculator-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="section-title chart-title">
                                <span>Check your body</span>
                                <h2>BMI CALCULATOR CHART</h2>
                            </div>
                            <div className="chart-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>BMI</th>
                                            <th>WEIGHT STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="point">Below 18.5</td>
                                            <td>Underweight</td>
                                        </tr>
                                        <tr>
                                            <td className="point">18.5 - 24.9</td>
                                            <td>Healthy</td>
                                        </tr>
                                        <tr>
                                            <td className="point">25.0 - 29.9</td>
                                            <td>Overweight</td>
                                        </tr>
                                        <tr>
                                            <td className="point">30.0 and Above</td>
                                            <td>Obese</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="section-title chart-calculate-title">
                                <span>Check your body</span>
                                <h2>CALCULATE YOUR BMI</h2>
                            </div>
                            <div className="chart-calculate-form">
                                <form onSubmit={calculateBMI}>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <input
                                                type="number"
                                                placeholder="Height"
                                                value={height}
                                                onChange={(e) => setHeight(e.target.value)}
                                            />
                                            <select value={heightUnit} onChange={(e) => setHeightUnit(e.target.value)}>
                                                <option value="cm">cm</option>
                                                <option value="ft">ft/in</option>
                                            </select>
                                        </div>
                                        <div className="col-sm-6">
                                            <input
                                                type="number"
                                                placeholder="Weight"
                                                value={weight}
                                                onChange={(e) => setWeight(e.target.value)}
                                            />
                                            <select value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)}>
                                                <option value="kg">kg</option>
                                                <option value="lb">lb</option>
                                            </select>
                                        </div>
                                        <div className="col-sm-6">
                                            <input
                                                type="number"
                                                placeholder="Age"
                                                value={age}
                                                onChange={(e) => setAge(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <input
                                                type="text"
                                                placeholder="Sex"
                                                value={sex}
                                                onChange={(e) => setSex(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-lg-12">
                                            <button type="submit">Calculate</button>
                                        </div>
                                        {error && <div className="error-message">{error}</div>}
                                    </div>
                                </form>
                                {bmi && (
                                    <div className="result">
                                        <h3>Your BMI: {bmi}</h3>
                                        <h4>Status: {status}</h4>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default BMICalculator;
