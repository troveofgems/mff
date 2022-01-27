import React, {useEffect} from 'react';
import ReactFlot from 'react-flot';

const Demographics = () => {

  useEffect(() => {
    if (window.Flotr) {
      const wins = [
        [2006, 13],
        [2007, 11],
        [2008, 15],
        [2009, 15],
        [2010, 18],
        [2011, 21],
        [2012, 28]
      ];
      console.log('Attempt To Draw A Graph');
     /* window.onLoad = function() {
        return window.Flotr.draw(
          document.getElementById("placeholder"),
          [
            [2006, 13],
            [2007, 11],
            [2008, 15],
            [2009, 15],
            [2010, 18],
            [2011, 21],
            [2012, 28]
          ],
          {
            bars: {
              show: true
            }
          }
        )
      }*/
      //window.onLoad();
    }
  }, []);

  return (
    <>
      <div id={"placeholder"} style={{height: "500px", width: "500px"}}>
        Test
      </div>
    </>
  );
};

export default Demographics;