// DOM elements
const basicInput = document.getElementById('basicPay');
const allow1Input = document.getElementById('allowances1');
const allow2Input = document.getElementById('allowances2');

const grossSpan = document.getElementById('grossDisplay');
const napsaSpan = document.getElementById('napsaDisplay');
const nhiSpan = document.getElementById('nhiDisplay');
const totalContribSpan = document.getElementById('totalContribDisplay');
const totalTaxSpan = document.getElementById('totalTaxDisplay');
const totalDeductionsSpan = document.getElementById('totalDeductionsDisplay');
const netSalarySpan = document.getElementById('netSalaryDisplay');

const band1Charge = document.getElementById('band1Charge');
const band2Charge = document.getElementById('band2Charge');
const band3Charge = document.getElementById('band3Charge');
const band4Charge = document.getElementById('band4Charge');
const band1Tax = document.getElementById('band1Tax');
const band2Tax = document.getElementById('band2Tax');
const band3Tax = document.getElementById('band3Tax');
const band4Tax = document.getElementById('band4Tax');

const clearBtn = document.getElementById('clearBtn');

// Constants
const NAPSA_RATE = 0.05;
const NHI_RATE = 0.01;   

// Format as K 1,234.56
function formatMoney(value) {
    return 'K ' + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Format number without currency 
function formatNumber(value) {
    return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function updateCalculator() {
    const basic = parseFloat(basicInput.value) || 0;
    const allow1 = parseFloat(allow1Input.value) || 0;
    const allow2 = parseFloat(allow2Input.value) || 0;

    const gross = basic + allow1 + allow2;

    const napsa = gross * NAPSA_RATE;
    const nhi = gross * NHI_RATE;
    const totalContrib = napsa + nhi;

    const taxable = Math.max(0, gross - totalContrib);

    // PAYE 2026 bands
    let remaining = taxable;
    const band1 = Math.min(remaining, 5100);
    remaining -= band1;

    const band2 = Math.min(remaining, 2000);
    remaining -= band2;

    const band3 = Math.min(remaining, 2100);
    remaining -= band3;

    const band4 = remaining;

    const taxBand1 = 0;
    const taxBand2 = band2 * 0.20;
    const taxBand3 = band3 * 0.30;
    const taxBand4 = band4 * 0.37;

    const paye = taxBand1 + taxBand2 + taxBand3 + taxBand4;

    const totalDeductions = totalContrib + paye;
    const net = gross - totalDeductions;

    // Update displays
    grossSpan.innerText = formatMoney(gross);
    napsaSpan.innerText = formatMoney(napsa);
    nhiSpan.innerText = formatMoney(nhi);
    totalContribSpan.innerText = formatMoney(totalContrib);
    totalTaxSpan.innerText = formatMoney(paye);
    totalDeductionsSpan.innerText = formatMoney(totalDeductions);
    netSalarySpan.innerText = formatMoney(net);

    // Update table
    band1Charge.innerText = formatNumber(band1);
    band2Charge.innerText = formatNumber(band2);
    band3Charge.innerText = formatNumber(band3);
    band4Charge.innerText = formatNumber(band4);
    band1Tax.innerText = formatNumber(taxBand1);
    band2Tax.innerText = formatNumber(taxBand2);
    band3Tax.innerText = formatNumber(taxBand3);
    band4Tax.innerText = formatNumber(taxBand4);
}

// Event listeners
[basicInput, allow1Input, allow2Input].forEach(input => {
    input.addEventListener('input', updateCalculator);
});

clearBtn.addEventListener('click', () => {
    basicInput.value = '';
    allow1Input.value = '';
    allow2Input.value = '';
    updateCalculator();
});

// Initial update
updateCalculator();