let d = new Date();
document.getElementById("date").innerHTML = d.toLocaleDateString("en-us", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const url = "https://twitter-trends5.p.rapidapi.com/twitter/request.php";
const options = {
  method: "POST",
  headers: {
    "x-rapidapi-key": "",
    "x-rapidapi-host": "twitter-trends5.p.rapidapi.com",
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: new URLSearchParams({ woeid: "23424934" }),
};

fetch(url, options)
  .then((res) => res.json())
  .then((result) => {

    let trendingTopics = [];

    // for(let i = 0; i < 10; i++){
    //     trendingTopics.push(result.trends[i])
    // }

    // const topics = trendingTopics.map((item) => {
    //   return item.name;
    // });
    // const volumes = trendingTopics.map((item) => {
    //   return item.volume;
    // });


    const trendsArray = Object.values(result.trends);
    const topics = trendsArray.map((item) => {
      return item.name;
    });
    const volumes = trendsArray.map((item) => {
      return item.volume;
    });

    volumes.sort(function (a, b) {
      return b - a;
    });

    const slicedVolumes = volumes.slice(0, 9);
    const slicedTopics = topics.slice(0, 9);

    const ctx = document.getElementById("myChart");

    new Chart(myChart, {
      type: "bar",
      data: {
        labels: slicedTopics,
        datasets: [
          {
            label: "# of tweets/xeets",
            data: slicedVolumes,
            borderWidth: 2,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
            hoverBackgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
          },
        ],
      },
      options: {
        indexAxis: "y",
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  });
