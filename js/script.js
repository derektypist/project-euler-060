// Function to Show Solution
function showSolution() {
    // Set Up Variable
    let txt = `Solution is ${primePairSets()}.<br>`;
    // Display Solution in the Browser
    document.getElementById("solution").innerHTML = txt;
}

/*
    Function to return the solution as described in
    https://projecteuler.net/problem=60
*/
function primePairSets() {
    let primes = eratosthenes(8400);
    let soluce = 0;
    const setPrimePairs = (n) => {
        let index = primes.indexOf(n);
        let temp = [];
        for (let j = index; j < primes.length; j++) {
            if (isPrime(parseInt('' + primes[index] + primes[j])) && isPrime(parseInt('' + primes[j] + primes[index]))) temp.push(primes[j]);
        }
        return temp;
    };

    for (let i = 5; i < primes.length; i++) {
        let tab1 = setPrimePairs(primes[i]);
        if (tab1.length > 0) {
            for (let j = 0; j < tab1.length; j++) {
                let tab2 = setPrimePairs(tab1[j]);
                let tab3 = [];
                for (let k = 0; k < tab1.length; k++) {
                    if (binarySearch(tab2, tab1[k]) > -1) tab3.push(tab1[k]);
                }

                if (tab3.length > 0) {
                    for (let k = 0; k < tab3.length; k++) {
                        let tab4 = setPrimePairs(tab3[k]);
                        let tab5 = [];
                        for (let l = 0; l < tab3.length; l++) {
                            if (binarySearch(tab4, tab3[l]) > -1) tab5.push(tab3[l]);
                        }

                        if (tab5.length > 0) {
                            for (let m = 0; m < tab5.length; m++) {
                                for (let l = 0; l < tab5.length; l++) {
                                    let tab6 = setPrimePairs(tab5[l]);
                                    let temp = 0;
                                    for (let m = 0; m < tab5.length; m++) {
                                        if (binarySearch(tab6, tab5[m]) > -1) temp = tab5[m];
                                        if (temp > 0) {
                                            soluce = primes[i] + tab1[j] + tab3[k] + tab5[l] + temp;
                                            break;
                                        }
                                    }
                                    if (soluce > 0) break;
                                }
                            }
                            if (soluce > 0) break;
                        }
                    }
                    if (soluce > 0) break;
                }
            }
            if (soluce > 0) break;
        }
    }

    return soluce;
}

// Function to Return Array of Primes
function eratosthenes(n) {
    let detectPrimes = Array(n);
    let primes = [];
    detectPrimes[0] = false;
    detectPrimes[1] = false;
    for (let i = 2; i < detectPrimes.length; i++) {
        detectPrimes[i] = true;
    }

    for (let p = 2; p < Math.sqrt(n); p++) {
        if (detectPrimes[p]) {
            for (let j = p * p; j < n; j += p) {
                detectPrimes[j] = false;
            }
        }
    }

    for (let i = 0; i < n; i++) {
        if (detectPrimes[i]) primes.push(i);
    }

    return primes;
}

// Function to check if number n is prime
function isPrime(n) {
    if (n <= 3) return n > 1;
    if (n % 2 == 0 || n % 3 == 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) return false;
    }
    return true;
}

// Function to do Binary Search
function binarySearch(arr, x) {
    let min = 0;
    let max = arr.length - 1;
    let guess;
    while (min <= max) {
        guess = ((max + min) >>> 1);
        if (x === arr[guess]) {
            return guess;
        } else if (x < arr[guess]) {
            max = guess - 1;
        } else {
            min = guess + 1;
        }
    }
    return -1;
}

// Function to Hide Solution
function hideSolution() {
    let txt = "";
    document.getElementById("solution").innerHTML = txt;
}