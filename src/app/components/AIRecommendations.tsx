import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Sparkles, Clock, Users, CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const mealRecommendations = [
  {
    name: "Grilled Salmon Bowl",
    calories: 450,
    protein: 35,
    time: "25 min",
    image: "https://images.unsplash.com/photo-1670164747721-d3500ef757a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMG51dHJpdGlvbnxlbnwxfHx8fDE3NjIzNzkxOTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["High Protein", "Low Carb"]
  },
  {
    name: "Quinoa Power Salad",
    calories: 380,
    protein: 15,
    time: "15 min",
    image: "https://images.unsplash.com/photo-1670164747721-d3500ef757a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMG51dHJpdGlvbnxlbnwxfHx8fDE3NjIzNzkxOTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Vegetarian", "Fiber Rich"]
  }
];

const workoutRecommendations = [
  {
    name: "Full Body HIIT",
    duration: "30 min",
    calories: 350,
    difficulty: "Intermediate",
    exercises: 8
  },
  {
    name: "Upper Body Strength",
    duration: "45 min",
    calories: 280,
    difficulty: "Advanced",
    exercises: 10
  }
];

export function AIRecommendations() {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm">AI-Powered Recommendations</span>
          </div>
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
            Personalized Just for You
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI analyzes your habits, goals, and progress to suggest the perfect meals and workouts
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-2xl text-gray-900 mb-6">Today's Meal Suggestions</h3>
            <div className="space-y-4">
              {mealRecommendations.map((meal, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative h-48 sm:h-auto sm:w-48 flex-shrink-0">
                      <ImageWithFallback
                        src={meal.image}
                        alt={meal.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{meal.name}</CardTitle>
                            <CardDescription className="flex items-center gap-3 mt-2">
                              <span>{meal.calories} cal</span>
                              <span>•</span>
                              <span>{meal.protein}g protein</span>
                              <span>•</span>
                              <Clock className="h-3 w-3 inline" /> {meal.time}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          {meal.tags.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                          View Recipe
                        </Button>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl text-gray-900 mb-6">Recommended Workouts</h3>
            <div className="space-y-4">
              {workoutRecommendations.map((workout, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{workout.name}</CardTitle>
                        <div className="mt-2 text-muted-foreground">
                          <div className="flex items-center gap-3 mb-2">
                            <Clock className="h-4 w-4" />
                            <span>{workout.duration}</span>
                            <span>•</span>
                            <span>{workout.calories} cal burned</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{workout.difficulty}</Badge>
                            <Badge variant="outline">{workout.exercises} exercises</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      Start Workout
                    </Button>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1584827386916-b5351d3ba34b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGVyY2lzZSUyMHdvcmtvdXQlMjBneW18ZW58MXx8fHwxNzYyNDQ5MjYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Workout"
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <span>AI Insight</span>
                  </CardTitle>
                  <CardDescription className="text-gray-700">
                    Based on your progress, you're on track to reach your target weight of 70kg in approximately 8 weeks. Keep up the great work!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Consistent calorie deficit</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>5 workouts completed this week</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Improved sleep quality</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
