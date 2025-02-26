const num = 1000000;
const chainNum = new Array(num + 1).fill(0);

const longestChainNumber = () => {
  let maxChain = 0;
  let maxNum = 0;

  for (let n = num - 1; n >= 2; n--) {
    let tmp = countChain(n);
        
    if (maxChain < tmp) {
      maxChain = tmp;
      maxNum = n;
    }
  }

  return maxNum;
}

const countChain = (n) => {
  let count = 1;
  let sequence = [];
    
  while (n !== 1) {
    if (n <= num && chainNum[n] > 0) {
      count += chainNum[n] - 1;
      break;
    }
        
    sequence.push(n);
    n = nextCollatzNumber(n);
    count++;
  }
    
  for (let i = 0; i < sequence.length; i++) {
    if (sequence[i] <= num) {
      chainNum[sequence[i]] = count - i;
    }
  }
    
  return count;
}

const nextCollatzNumber = (n) => {
  return n % 2 === 0 ? n / 2 : 3 * n + 1;
}

console.log(longestChainNumber());
