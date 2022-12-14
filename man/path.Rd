% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/path.R
\name{path}
\alias{path}
\title{Diary Paths Visualization for Time-Use Data in R}
\usage{
path(df, act, w = NULL)
}
\arguments{
\item{df}{a json data.Each row represents an observation. Each column represents
the diary activity at t=1 (4am) to t=1440 (3:59am), but the number of steps depends
diary's granularity.}

\item{act}{a json object with the codes of activities}

\item{w}{a json array of survey weights for each observation. Default is NULL, which returns
all nodes of the same size.}
}
\description{
Visualizes paths from and into an activity in a chord diagram.The sizes of the objects
are relative to the survey weights.
}
\references{
Kolpashnikova, Kamila. (2022). Diary Paths Visualization for Time-Use Data in R. Toronto,ON: York University.
}
