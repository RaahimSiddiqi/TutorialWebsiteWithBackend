import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
    return ( 
        <div>
            <Card className="container my-8">
                <CardHeader>
                    <CardTitle>Home</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        This is the home page. Welcome, Raahim.
                    </CardDescription>
                </CardContent>
            </Card>
        </div>
     );
}
 
export default Home;