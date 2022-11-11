## Diary Paths Visualization for Time-Use Data in R

### Installation

```
devtools::install_github("Kolpashnikova/package_R_path")

library(path)
```

### Description
Visualizes paths from and into an activity in a chord diagram.The sizes of the objects are relative to the survey weights.

### Usage
```
path(df, act, w = NULL)
```

### Arguments

*df*	
a json data.Each row represents an observation. Each column represents the diary activity at t=1 (4am) to t=1440 (3:59am), but the number of steps depends diary's granularity.

*act*	
a json object with the codes of activities

*w*
a json array of survey weights for each observation. Default is NULL, which returns all nodes of the same size.

### How it looks like

You can try the interactive demo here: (https://kolpashnikova.github.io/path)

![Transitions](https://github.com/Kolpashnikova/package_R_path/blob/main/examples/path.png)

### References
Kolpashnikova, Kamila. (2022). Diary Paths Visualization for Time-Use Data in R. Toronto,ON: York University.
