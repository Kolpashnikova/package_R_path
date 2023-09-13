#' Diary Paths Visualization for Time-Use Data in R
#'
#' @description
#' Visualizes paths from and into an activity in a chord diagram.The sizes of the objects
#' are relative to the survey weights.
#'
#' @usage
#' path(df, act, w = NULL, width = "auto", height = "auto")
#'
#' @param df a json data.Each row represents an observation. Each column represents
#' the diary activity at t=1 (4am) to t=1440 (3:59am), but the number of steps depends
#' diary's granularity.
#'
#' @param act a json object with the codes of activities
#'
#' @param w a json array of survey weights for each observation. Default is NULL, which returns
#' all nodes of the same size.
#'
#' @param width a string specifying the width of the output file in pixels (px), it's "auto" by default --
#' which specifies responsive size
#'
#' @param height a string specifying the height of the output file in pixels (px), it's "auto" by default --
#' which specifies responsive size
#'
#' @references
#' Kolpashnikova, Kamila. (2022). Diary Paths Visualization for Time-Use Data in R. Toronto,ON: York University.
#'
#'
#' @import htmlwidgets
#'
#' @export
path <- function(df, act, w = NULL, width = "auto", height = "auto", elementId = NULL) {

  # forward options using x
  x = list(
    data = df,
    weights = w,
    act = act,
    message = "works"
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'path',
    x,
    width = width,
    height = height,
    package = 'path',
    elementId = elementId
  )
}

#' Shiny bindings for path
#'
#' Output and render functions for using path within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a path
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name path-shiny
#'
#' @export
pathOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'path', width, height, package = 'path')
}

#' @rdname path-shiny
#' @export
renderPath <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, pathOutput, env, quoted = TRUE)
}
