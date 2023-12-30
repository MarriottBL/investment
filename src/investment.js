import React, { useState } from 'react';

function Investment() {
const [formData, setFormData] = useState({
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    purchasePrice: '',
    closingCost: '',
    interestRate: 0,
    downPayment: '',
    loanTerm: '',
    averageRental: '',
    propertyTaxes: '',
    insurance: '',
    managementFees: '',
    waterAndSewer: '',
    hoa: ''
});

const [calculationResults, setCalculationResults] = useState({
    monthlyMortgage: null,
    totalMonthlyExpenses: null,
    annualCashFlow: null,
    roi: null
});

const resetForm = () => {
    setFormData({
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    purchasePrice: '',
    closingCost: '',
    interestRate: '',
    downPayment: '',
    loanTerm: '',
    averageRental: '',
    propertyTaxes: '',
    insurance: '',
    managementFees: '',
    waterAndSewer: '',
    hoa: ''
    });

    // Optionally, also reset the calculation results
    setCalculationResults({
    monthlyMortgage: null,
    totalMonthlyExpenses: null,
    annualCashFlow: null,
    roi: null
    });
};



const handleChange = (e) => {
    let { name, value } = e.target;


    if (name === "interestRate" ) {

    value = parseFloat(value) / 100;
    }
    setFormData({ ...formData, [name]: value });
};

const handleSubmit = (e) => {
    e.preventDefault();

    // Convert form data to numbers
    const formDataNum = {
    purchasePrice: Number(formData.purchasePrice),
    closingCost: Number(formData.closingCost),
    interestRate: Number(formData.interestRate),
    downPayment: Number(formData.downPayment),
    loanTerm: Number(formData.loanTerm),
    averageRental: Number(formData.averageRental),
    propertyTaxes: Number(formData.propertyTaxes),
    insurance: Number(formData.insurance),
    managementFees: Number(formData.managementFees),
    waterAndSewer: Number(formData.waterAndSewer),
    hoa: Number(formData.hoa)
    };

    const monthlyMortgage = calculateMonthlyMortgage(
        formDataNum.purchasePrice,
        formDataNum.downPayment,
        formDataNum.interestRate,
        formDataNum.loanTerm
    );

    const totalMonthlyExpenses = calculateMonthlyExpenses(
        formDataNum.propertyTaxes,
        formDataNum.insurance,
        formDataNum.managementFees,
        formDataNum.waterAndSewer,
        formDataNum.hoa
    );

    const annualCashFlow = calculateAnnualCashFlow(
        formDataNum.averageRental,
        monthlyMortgage,
        totalMonthlyExpenses
    );

    const totalInvestment = formDataNum.downPayment + formDataNum.closingCost;
    const roi = calculateROI(annualCashFlow, totalInvestment);

    // Mortgage calculation (PMT formula)
    function calculateMonthlyMortgage(purchasePrice, downPayment, interestRate, loanTerm) {
        const loanAmount = purchasePrice - downPayment;
        const monthlyInterestRate = interestRate / 12;
        const totalPayments = loanTerm * 12;

        return loanAmount *
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) /
        (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
    }

    // Monthly expenses
    function calculateMonthlyExpenses(propertyTaxes, insurance, managementFees, waterAndSewer, hoa) {
        return (propertyTaxes + insurance + managementFees + waterAndSewer + hoa) / 12;
    }

    // Annual cash flow
    function calculateAnnualCashFlow(averageRental, monthlyMortgage, totalMonthlyExpenses) {
        const monthlyCashFlow = averageRental - monthlyMortgage - totalMonthlyExpenses;
        return monthlyCashFlow * 12;
    }

    // Return on Investment (ROI)
    function calculateROI(annualCashFlow, totalInvestment) {
        return (annualCashFlow / totalInvestment) * 100;
    }

    setCalculationResults({
        monthlyMortgage,
        totalMonthlyExpenses,
        annualCashFlow,
        roi
    });
};

return (
    <div className='measure center'>
    <form onSubmit={handleSubmit} className="pa4 black-80">
    <input
        className='input-reset ba b--black-20 pa2 mb2 db w-100'
        type="text"
        name="streetAddress"
        value={formData.streetAddress}
        onChange={handleChange}
        placeholder="Street Address"
    />
    <input
        className='input-reset ba b--black-20 pa2 mb2 db w-100'
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="City"
    />
    <input
        className='input-reset ba b--black-20 pa2 mb2 db w-100'
        type="text"
        name="state"
        value={formData.state}
        onChange={handleChange}
        placeholder="State"
    />
    <input
        className='input-reset ba b--black-20 pa2 mb2 db w-100'
        type="text"
        name="zipCode"
        value={formData.zipCode}
        onChange={handleChange}
        placeholder="Zip Code"
    />
    <input
        className='input-reset ba b--black-20 pa2 mb2 db w-100'
        type="number"
        name="purchasePrice"
        value={formData.purchasePrice}
        onChange={handleChange}
        placeholder="Purchase Price"
    />
    <input
        className='input-reset ba b--black-20 pa2 mb2 db w-100'
        type="number"
        name="closingCost"
        value={formData.closingCost}
        onChange={handleChange}
        placeholder="Closing Cost"
    />
    <input
        className='input-reset ba b--black-20 pa2 mb2 db w-100'
        type="text"
        name="interestRate"
        value={formData.interestRate *100  || ''}
        onChange={handleChange}
        placeholder="Interest Rate (%)"
        step="0.01"
    />
    <input
        className='input-reset ba b--black-20 pa2 mb2 db w-100'
        type="number"
        name="downPayment"
        value={formData.downPayment}
        onChange={handleChange}
        placeholder="Down Payment"
    />
    <input
        className='input-reset ba b--black-20 pa2 mb2 db w-100'
        type="number"
        name="loanTerm"
        value={formData.loanTerm}
        onChange={handleChange}
        placeholder="Loan Term"
    />
    <input
        className='input-reset ba b--black-20 pa2 mb2 db w-100'
        type="number"
        name="averageRental"
        value={formData.averageRental}
        onChange={handleChange}
        placeholder="Average Rental"
    />
    <input
        className='input-reset ba b--black-20 pa2 mb2 db w-100'
        type="number"
        name="propertyTaxes"
        value={formData.propertyTaxes}
        onChange={handleChange}
        placeholder="Annual Property Taxes"
    />
    <input
        className='input-reset ba b--black-20 pa2 mb2 db w-100'
        type="number"
        name="insurance"
        value={formData.insurance}
        onChange={handleChange}
        placeholder="Annual Insurance"
    />
    <input
        className='input-reset ba b--black-20 pa2 mb2 db w-100'
        type="text"
        name="managementFees"
        value={formData.managementFees !== '' ? `${formData.managementFees}%` : ''}
        onChange={handleChange}
        placeholder="Management Fees %"
    />
    <input
        className='input-reset ba b--black-20 pa2 mb2 db w-100'
        type="number"
        name="waterAndSewer"
        value={formData.waterAndSewer}
        onChange={handleChange}
        placeholder="Water and Sewer"
    />
    <input
        className='input-reset ba b--black-20 pa2 mb2 db w-100'
        type="number"
        name="hoa"
        value={formData.hoa}
        onChange={handleChange}
        placeholder="HOA Fees"
    />
    <button className="f5 link dim br1 ph pv mb2 dib white bg-green" type="submit">Calculate</button>
    <button className="f5 link dim br1 ph pv mb2 dib white bg-black" type="button" onClick={resetForm}>Clear</button>
    </form>

    {calculationResults.monthlyMortgage != null && (
        <div className='results color: white'>
        <h3>Calculation Results</h3>
        <p>Monthly Mortgage: {calculationResults.monthlyMortgage.toFixed(2)}</p>
        <p>Total Monthly Expenses: {calculationResults.totalMonthlyExpenses.toFixed(2)}</p>
        <p>Annual Cash Flow: {calculationResults.annualCashFlow.toFixed(2)}</p>
        <p>ROI: {calculationResults.roi.toFixed(2)}%</p>
        </div>
        )}
    </div>
    );
}

export default Investment;
