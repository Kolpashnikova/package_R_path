% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/path.R
\name{path}
\alias{path}
\title{Diary Paths Visualization for Time-Use Data in R}
\usage{
path(df, act, w = NULL, layout = "default", focusActivity = NULL,
    width = "auto", height = "auto")
}
\arguments{
\item{df}{a json data.Each row represents an observation. Each column represents
the diary activity at t=1 (4am) to t=1440 (3:59am), but the number of steps depends
diary's granularity.}

\item{act}{a json object with the codes of activities}

\item{w}{a json array of survey weights for each observation. Default is NULL,
which returns all nodes of the same size.}

\item{layout}{a string option from ("default", "circular", "circularCenter"),
which will make a grid layout or a circular
layout with different activities across the circle. "circularCenter" needs
the option focusActivity to be specified,
which will place an activity at the center of the circle.}

\item{focusActivity}{a string with the name of the activity to make the focus.}

\item{colors}{a list of hex custom colors for activities.}

\item{width}{a string specifying the width of the output file in pixels (px),
it's "auto" by default --
which specifies responsive size}

\item{height}{a string specifying the height of the output file in pixels (px),
it's "auto" by default --
which specifies responsive size}
}
\description{
Visualizes paths from and into an activity in a chord diagram.The sizes of the objects
are relative to the survey weights.
}
\references{
Kolpashnikova, Kamila. (2022). Diary Paths Visualization for Time-Use Data in R.
Toronto,ON: York University.
}
