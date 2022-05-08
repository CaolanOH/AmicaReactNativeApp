import {View} from 'react-native';
import { LineChart } from "react-native-chart-kit";
import colors from '../config/colors';
const MoodChart = () => {
  return (
    <View>
    <LineChart
      data={{
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100
            ]
          }
        ]
      }}
      width={355} // from react-native
      height={220}
      yAxisLabel="$"
      yAxisSuffix="k"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: colors.background,
        backgroundGradientFrom: colors.primary,
        backgroundGradientTo: colors.primary,
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius:5,
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
        }
      }}
      style={{
        //borderWidth:1,
        //borderColor: colors.label,
        borderRadius:5,
      }}
    />
  </View>
  )
}
export default MoodChart