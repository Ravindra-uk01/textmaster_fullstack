export const timesAgo = (createdTime)=> {
    const now = new Date();
    const seconds = Math.floor((now-createdTime)/1000);
    const minutes = Math.floor(seconds /60);
    const hours = Math.floor(minutes/60);
    const days = Math.floor(hours/24);
    const weeks = Math.floor(days/7);
    const months = Math.floor(days/30);
    const years = Math.floor(days/365);

    if(seconds<60){
      return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
    }else if(minutes < 60){
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    }else if(hours < 24){
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    }else if(days < 7){
      return days === 1 ? "1 day ago" : `${days} days ago`;
    }else if(weeks < 4){
      return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
    }else if(months < 12){
      return months === 1 ? "1 month ago" : `${months} months ago`;
    }else {
      return years === 1 ? "1 year ago" : `${years} years ago`;
    }
  }

export const timesAgoShort = (createdTime) => {
  const now = new Date();
  const seconds = Math.floor((now-createdTime)/1000);
  const minutes = Math.floor(seconds /60);
  const hours = Math.floor(minutes/60);
  const days = Math.floor(hours/24);
  const weeks = Math.floor(days/7);
  const months = Math.floor(days/30);
  const years = Math.floor(days/365);

  if(seconds<60){
    return `${seconds}s`;
  }else if(minutes < 60){
    return `${minutes}m`;
  }else if(hours < 24){
    return `${hours}h`;
  }else if(days < 7){
    return `${days}d`;
  }else if(weeks < 4){
    return `${weeks}w`;
  }else if(months < 12){
    return `${months}mo`;
  }else {
    return `${years}y`;
  }
}