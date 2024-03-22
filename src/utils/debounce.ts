const debounce = (func: (arg0: any) => void, wait: number | undefined) => {
    let timeout: string | number | NodeJS.Timeout | undefined;
  
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
  
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  