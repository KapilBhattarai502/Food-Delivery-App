import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FoodCard = ({ item, cartItems, setCartItems }) => {
  const [quantity, setQuantity] = useState(0);

  const { id } = item;
  useEffect(() => {
    const foundItem = cartItems.find((cartItem) => cartItem.id === id);
    setQuantity(foundItem ? foundItem.quantity : 0);
  }, [cartItems, id]);

  console.log("quantity is", quantity);

  const notifyAdded = () => toast.success("Added to Cart!");
  const notifyRemove = () => toast.error("Removed from Cart!");
  const { name, type, price } = item;

  function addToCartItems(item) {
    const itemExists = cartItems.find((cartItem) => {
      return cartItem.id === item.id;
    });
    console.log('itemExists',itemExists);

    if (itemExists) {
      // If item exists, increment its quantity
      setCartItems((prev) =>
        prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      // If item doesn't exist, add it with quantity 1
      setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
    }

    notifyAdded();
  }

  function removeFromCartItems(item) {
    notifyRemove();

    if (quantity === 1) {
      console.log("displayquantity 1");
      setCartItems((prev) =>
        prev.filter((cartItem) => cartItem.id !== item.id)
      );
    } else {
      const itemExists = cartItems?.find((cartItem) => cartItem.id === item.id);
      if (itemExists) {
        setCartItems((prev) =>
          prev.map((prevCartItem) =>
            prevCartItem.id === item.id
              ? { ...prevCartItem, quantity: prevCartItem.quantity - 1 }
              : prevCartItem
          )
        );
      }
    }
  }

  return (
    <div className="p-4 shadow-lg rounded-lg hover:-translate-y-2 transition-all">
      <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUXFxcYGBcYGBcbHhkYHhoYFxkaHRgZHSggGBolGxgeITEhJykrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGzUmHyUuLS0wMCsrLS8vNS0tLS0tLS0vMC8uLS0tLS0wLS0vLS0vKy01LS0tLS0tLS0tLS0tLf/AABEIAMIBAwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAFBgQHAAIDAQj/xAA/EAACAQIEBAQEBAUDAwMFAAABAhEAAwQSITEFBkFREyJhcTKBkaEHUrHRFELB4fAjYpIVcvEWM4IXQ1OTov/EABoBAAIDAQEAAAAAAAAAAAAAAAIDAAEEBQb/xAAzEQACAQIEAwYFBAIDAAAAAAABAgADEQQSITEiQVETYXGBofAUMpHR4QVCscFS8RUjM//aAAwDAQACEQMRAD8At2sIr2KypJPK1it68qSTWKyK2rKkk0ivYreK8qSTWsitq9ipJNIrIreKypJNKyK2rDUknM15W9ZFSSaVlbEV5lqSTU15W+WsipJNYrBW8UjfiJz4uBHhWgHxDCddrYOxI6nsKkkcsTiUtrmuOqL1LEAfU0tYz8QuG2zBxAY/7FZvuBFUXjcdisa+e473WkDU6AnYAbL8q1xXBrtuQ+WQJIBmNtCRpOtLasgNidY1aLkXtpLp/wDqnw/vd/8A1n96kYf8SeHsY8R1/wC62/8AQGqKw1tZBYg66rqPvRjg/D1vMd0ABiPNrBIkTOXT4ulC9YJqdoS0C2g3l88P4/hb+lq/bY9gwB/4nWiBFUVxHlu7bAzhQIzGTDKIJBK7/wAp2rvy/wA14vDxluG5b/8Ax3JYR6Hdflp6UVOqlQXU3gVKTIbNLtNakUJ5c5jtYxCU8txfjtndfX1X1oxBpkXOZFeRW8V5FSSc4rK3isqSQhWUDuXMuoYz3k1lvizDc5h6j+opAxC84/sG5Q5XkVCw/Fbbb+X32+tTgetNVg20Uyld55FZW0V5RQZleRXK/iVUakUt8W5st2xoaxV8fSpabmaKWGeptGZ7qjc1Ev8AE1XpNIOK53SNNSfWT8hUB+LHKbtxion4V1I/YnauZV/UcQ3/AJr6TfT/AE8fuj7ieYlUSRHvUL/1ROgPSdIqteJ8WtsZm4Cp2ZSJEA7nQzQvGcYvMItAW0G7T5iOpHQb0CjHVf3kek0fC0FW9pbtrmFmkq2gGs5Y/Tetm5jbSGQ+xA/WqW4dzNdQsquzBtIaW009o1/WpSczHLLIZ6ZdPtG1EaWNU/OT5yuwonkPpLaHNhBAlfmOnyNEMHzNauGBE+/9qprhGExuK89qw+UCQSGAP+3N/Wid3hmMsIGa2LTZgMxZVQCdQJMufb600PiaY1qDzlHBUG0G8uC5xATAiYmO/trUM8cggMkE+oEe/Y0jYLgHEPEFxM2swwdSApnaTGum1c7vBeKvcYm2WIAklkAaDsFkADXffSo9TFXurj35QFwuH5kfX8ywTxxQcrKQfTWp9jF23Eqw9utVHdv462Wt3xBaCSVACqfysdx6iflUblzjPhY0gT4LLqGJIkbv76femUsRiUUmoQbe/ekp/wBORhdDLsFfPvO3CHucTdbjZPEuEZyJgfy6TqIird4fiA7EW3M76E+/0rjx/ldMYAzsFcaF1G49fX1p9LHrVU6WP1mFsMaba/aVngeWk/h86XCct1lBC75d8yn6TQ3B2lZlACksZuAGDlk6OzDL32PtTPi+QcQvmw2LF4BwcpdlEAmRAJBJ9Y60C4thmtWiL9krdkebK0gsQTDLo7A6DWB61i1JPFe/vu0nWV1Zcu3dOVt8MZt3bRVEeUW3lLBWOqm6QM/UyfYUVXj1tLJtWrYC21IWWaZJjxHCgZ5kmJIjpFCLuFYYN8QLtvQ5ACsOxnbLrqO5/TWuy8Ss3LdkXrloCcrgAZ9pMomoWdAR3q2GcHci/fKCIu28NWrCYjCpfLW2e06i4WZwGk7bkAaiYj6bx8UjO73sQBa1+EBzC6qjGBoDHvAqPd4vhw6W/Cum2AfguDKQG0hToDpBLCYUd5qBzBxzM95fHYq8KMoQMyDUKQg01MfF71dGnVzcA39BArNT2flCXB+Km3i8OyZQfEt2zlVlzI7ZGzTuYM/IdquouK+e+X7MMtxpAT4FJkz+Ynv2HSrA4Xx11iG07HUV2aalVAJnGrMGclRYSwmetDcqDw3iS3R2bt+1TTRxc8zmsrysqST5jxOPuXDLu7nuzMT9zTZyFxe8LotJmfN0EmO5PSK05X/D2/iIuX5sWjrqPOw9FPw+5+lW1wPl2zhkCWEyg79WY92J1NYHsdJ0VJGslWrXYRUi0zqfISP6/KpNvChfjPsu31NQcXxlV0QR00pD1lpyfNoBCtu68S7ADtAk/tUDivGgqHLJOsAb0o8c5mCHw5LXD/KhJI94/egXFsddxDDD2lNtWBzsGBJUDMZaBlEAkis74irV4RpeaaOBPzMNJ34lzYpbK92N9B+hOwpYx5Z2+KZOms/51+ldk4FAKsAcy5gIBaJicxXyjUHN96NWeA27TKf/AHLeUTbTzMtyCMpJKyuoMgnrrpJClRprxDUzpmmENht79/3FRcM1t2YRBWAT32n6z9Kk3cFftgE3Fy3FLLlY6R5TmgeXWmlOVlN7xPGzWtijDNlJmM2XSBJ7Ca1v8IuW8V57bjC5yCAJLqQwhVWc0aMRHb0FaTUOwkVaV9zEbieBup8MkzDEyTIgzB2UzUrE8vtcveFbe8ygkedMplQM8gCNDp6aU+cWNpApu7smUQuceU+UB4APaJETr69MVd8fCoCgyAjQWh8BXIHOVwpgiABJG/aiWudjpFPSU2Ye/vF3l/kn+IdLatCAkuQNgOw666b661Y3BuVOH4V1QWFLiIuXFzEn3OgOnakvBtew1wfwd1XtnMxzznJBAJYDTaImNzVqcOxaX0zgEEGCGAkH9j0NRQx2Mw4wsOVhJVy2Br9hQ7F4S3dgXELwdJ95qZjMclspmnzsFWFZpbf+UGPc1we9atOASim4SdTBZtP8+lXWQN0t3ic9Cw1G8lWLaqAFEAbCofGeNWMKua9cCzsBJY+yjX51NuuFUt2H36VR3GMf4zved9XOVZAbNqYgN8AAIHyJ60yo/ZgACbP0/BDEsS5so+ussR+a7ly1ntYZMhjKLzQW3GbKAZ6eWdZ3qucfhLl66WZrds5lEIoRSsnUxqDr67xNGMBaObMuRhGV1ctrAhhmVdu28VOx2Ct5TeQIyLK3B4i6LsRmPWZKncHp1rH2jMfCdunRpYe4UWv7tqYucOxuKsIDbugtmKxupAbLAPUdjPQ0y8N5quXBku3AGgysZRl6kmST2EEVAuAvbW3bOeNyWGvYwNx/XXrUEYHwrpYjNpEuVUT3HWdNCIrOKlIOdr690Fsr/MNfCcbfMNyxi2a1BYqVNuCS2pfNOgGnX0603YbmvKk4u0yK8ATDDWdDFIWMWzvdzG7m8psnYHWCxMkyfkB0qUeINcsNcLsLanLBVCVyZSdJ1Yhonv7Vp7Om1jt3+9PSLq0e01tGrifJ+DxaZ8PNudjaYxPqhlfsKQuNfh/xKzrbBvp3UhW/4n+hNFuFXch8TDXXVmukDcqVJ2cE6KB194JqxeCcx27gyXiocGCAZUkkAFWMaEkbxqQKrPXw7atcHr7vOZVw6kaD3/E+e7mGvBit1LqsNwwcH6NUjDKF2WKv/jfBrd5NVmOvUexquuLcq3FkoucDdYhh7dGH+RW/D40VNGFjMFSgRtrFzC3DRvAuah4ThbE/CR70zcL4IxgBSfatw1maEuCXTnQjeRTzNCODcG8LzN8XQdv70XNWZJ5NZXlZVSTXD4TPJDadTA+nvXa5iVtqcsSBJJr3FYxVGhAWKCcbuwhXq2mvWZ/bT6Vyc1ybHaaa1QqIA47za48OVguCxgHyCSqzr1iY9fqA4nxZwMtoy7DW4NcpI0YdNNf1rnzylu2zM7hrmgS0DsolQzQNB5dB16npQbhfCcTcX/UsME/ka4Mv0DxmH2pC0hmzty6x+BrgHLUkiziVw90ZgGYwcwKnf+ZjPfXfrRvD8PL5L6fBdGXxFJ1OpdIMFTCnXaRFAL3AgwBusQ2afI38v5Y+Ee4+lP3LwRltSga4XdbakkKltUHmKpC6wFzRtG/WlFFnuPmnQq/qKKdDcd0g4TCC1d8W42dmhrYaVhSYkCRI0Eb/AA7bV0xOMWZJAO8AvGbrC7LI7VC5hxli1dMM0ENlIBfNEFk3EL/ntK4VdQobouWyx+BZkz3yz09jtO1U1zsdJsVhUQVd7+7SVaxMDOtvzt+WAQu8FgMxPv32qRh+IXyoBD3NQskagDUA9BPUwKg/x6K+s3LjxlJjyjYsBsNRHqQa7YfmC1bS9edyZIRCFCsQBJhQY32PtQ0uAxOJbs6ZfLee8dxlnDy62F8VvLmInpoNT0HaQKW7XEbrDNnCIDEnKqjsuglj6UI43zC+IuFmGUCQixEf39aDYvGuwAJgKIUDYf39aIozNvPO1KleoeImH8dxO2reW/czbEqEAA+Yk+1e8C5rvYds1vE+QDzI6KZEgawdDJ96S7jjvXO2pdgADr2Fako9JdMVDwgmX7w38QrN1Axt3TCku1tVKAgDNBLAkajp1qWOZcLeVboDB1GZfEtt8J30XoQNzoNPSq34DbuWbOWyA5DAs2uwykAWzppJBPUAnppJw6Xr4ysw8MqUBFvOoIMZZEgadInqalT5SJ2Fw1M6kW8/6lqLfW/aIDAyARlP/wAhqJ9KrRuDLaxZW4mZUgg3B5Tvl8pnY6T+gNcMNijh2M3XLwEVSzDJoIgIABEDTaiy3LmOu20zAFcwnYmBPmjRttNBsazM5I7+U0Ydfh8wB4SNZp49yAj6qCzLCAABiToNREn/AMVHxHFLTBsPddmt5MrC2qAKQZBmJzCAe2m1NI4W4QJiFe6V0DW3EgHfTcj0+1BsFwm3euFrWW2ULZlcGTpGU9BB1j/zSKZYNqZoFZHXoBzGsD4ThYsKhtl72hdAVKtBJO3UgdBXTH3DcEhfdbixrps8ad9YppxiOTZXNYBEnR0GgjQA+YjciO/SIqBisTeuBBbS5cO7BQTvIObZJK6awdjUfD52DsSTBpuG6fXbfeL2HwYZiLttLQiSUOck/wAp08o6bT+wTmM3WY4dDKTmLRoWIDQW7+nrVk8C5OYOLt8hYMpaXWBrGckkMfQaabmmhMGlsEDY9IAE/IVoFMpY20iauPp02ITilScLsslpb2RAistslw8yRMAq0Aa6SI0EmuHEeXGvF8l4XMw0IjTKe3cCJPrVo8W5fwt1CpUWydQU0lu5XZvc6+tV7bssHuYS6pBtkfASAyD4WCkTGusHrrTgwzb3gUcR2gNtPtGzlDjdtLSWL7ZboAXzE+Y7aEjX2miHGLGYSPqdqrPB3C4Nm55isrmJnySShid+k+lMfK/FTZVreKulrYE22YMSF6gnqe39qzVqRVOA7cucF6HFmA3hHDYlM0wCw3DAHT9R70z4LFI48sKfy6faN6VOL4BWi7bkMACrjYgidejCoWBxpM6FXUwyzqD3BHT5VpweNLL/ACJhrYcE98sE1qRQjhPGM0LcmejdD7kbH1owa6yMHFxOeylTYzWsrCK8orQYhcW4nce2WUZVnKrmDJ6+U/EOnvWcGxOKxly0xsK1uVYtbVhlCsGgsz5STlgjSCfSaB+NbNy0CLtxZFs58oUSdMuXUbzA9OhNXWzWrCrbEIoEKijWB2UamuNRorlNz4nSdbGKlNACt73t3SpsXwe4mJa9egX2JcgMG8MEkW1zAfFAJJH5gOknvjLwUSzEkaakkknff1/p2pi4zwq7euO6IwWSfOIkkDoT0jr3pV4li2tAI+VCJm4yKxOu4JlRXMxAL1CDcA7eHdOQwY8oUwvCx5Ll0Zf5gvXSIJHT/wAUWw6qEKreFrMsMwyZgpOup2HY+lImJ44FXML11xoTkIQbQJfSB00movCWv4i5HlS2SCROZT2JJEuf9009CtNbqPrpLp0nflHg2MJccYawq3PDQqWDz8R88keUmRr7RtXex+G+G/0zmcFCSQPD8xmRJyTHpRfh/Dlsols+Gp6HNlaREwMutFbPEbWY2zcGdcoYEgGW+HtvHTtW+mLjjFve03U61WkAKbGU5+JN/wAO69lraoN0IAAc/mkDQiYP96Wb1m9fNu0jC4qCEllESJM6xvtJmIq6OdsUlorcZFNwBhbaBoSDuSNNonpmnpVbPxw3MQng+Zs+5Al9fNuICxoN9Pes4bISFGxm0fqegQry9ZvwT8NnvK3jYkWrhHkVYb3kdfYGuWN/DhkChSbjGJIIykHXNG8QDoDJIOulWfbe1bZQqPnORmEkgT1BYgMAeg+lZxfDjI7Icr7gho1MgzoRr2Om1Ra1RdX9P9QlqKz6c+srDg/LeFV1LJ4+qkhmAAHUFVZvmZ2HSmzC8JCLmsmzaF0+KLSKJUKsQNZJJg9CCa2wb2sl2P8ATyg+KBcJd5zHz+UDcabkz2FTcBg7Zt5SV+EEyZYH4hqIzQRHzNH27HY3mypRpjW1ref4gD+FuZ2W0roFGR1zswUNBOoAyg6yO4rs627SolxsqgyQkgE9ALgbfKdRB6a61textuC1rJbCIQB1Jg7lhqM2nc9Bua4JxTB5EkjMpMiTDKQF0MASRBOgiKEVi2kecMSNFPlv5yDjENt2zMoNzUK6gyrHQhh+UCNevaplniCYbEWjazsFPmc5SsZlXKuUncSNWJ1BgUTtP/EW1TC4I3hAHiOSFGusuVAaOw13oVj+UcRba7exGqhQSbBAyRr5cxkkAR5l/ej00I2mdsq3WobHpcX+g285bvlAJ0iJn030pN4rdu3nIBRVAVsoOpkxJiNAAT1k7RFcOX+bcJZsmzcvHwUAW3dcNqp0yE5QSQOsQR7VH4/xFsIWKpqQSjxo2nlP+6B0oq7jTp/c83iaTobG9oCx+I8C5d8a2WETaIJzId1HoD9qEcv8xvbxi37rscxOZQ0BvKQJGxCyPpXJeIG6S2droYk52AB9iB22qK/B7l0jwrYYg6DYR1n071lpniymDTo2bUy7uHcbsXyVR5YCSusj+n/mpdi+jAiCCCV8ylTI00ncdjsaScPwfEgBLJvWD5AX8uTJBmAWzT6gaaU04WxKIj3WuMpgtIBbcQwSB8q0Nw7jXw0mvILXvJ1pSBqJNIX4nYdjaGKRTbuW2yElRmK9GHRh29+hEUw83Y+3YsE3Va4sqAikKxadIMiI3mdIqubnE7eJui1N5muwM924RmVcxCuqeUNKxMZgDRAZRtDo8P8A2ch/EDf9SuJirJXWQHYkbq25j70zcw3muKwCsgjUlW29D/LrFRsLh7mEv2mv5QkG3oDCqdAQTJgHrTficR4cBcrpBzK2sg9B0Hzn2pLFGqCqRtpL/wCWtoF9ZH5CYX8KpbdZUjYaEjb3qPzJwd7L+PaQ6fGAJleum8+1CeSeLsuNfDogt2ZYlGywJgg951NWe6qw70tFCMcvj9Y6q17PyOsQ7F4MoZCGB2I/bemLgvFM0I++ymfsetL3HuE/w9zxrWisf9RIkf8AfHQjrWrOI8wn1H+TW6jWtqIp0Dixj5WUs2OZiqgHK0Dckgn303rK3/EJ1mPsKnSIOHv27dwNeLSSWRVXUbhW32+8Va/L/GA+EU3JzeZRn1JAMAmNxp76VVfCsDZzkM83BG7LBY/7R1gfam3EY29ZQeCLMDRgyEidyQSQB964VTE9lWt1016T0OIoisgUb9ZIHMuIVF8dbFu3OUlJVlgwJDNGvTftUa7YS8Wyt4gk6aSCPbrFSuT+aP4y7dseHbW4ih1ItBZUEK2YTvJG3f0pusWMucC2bYJzSpEMT2G4PcR23pj4XtBmv6TlVh2bZWFj4yqOO8rhwVSxfLdEtgiZ0JbynQCoXCuBYm0VDWXNgNkDkhWt6iCZIAynuI9Qaue/xC2tvO75FgeZ/Kfnm1n0oNxDjNl7M5blxWOmRGY6SZ01EFd/arIy07A38odEsTcJ3XnKxw28QyYhRdGZmDNqQSSfKZlQJ+UCKm28FcFpUW0CFIC5yIAB31106VEsc1W2yjw7wkwCyRB7kbj5ipmN5is5XDeKMhAJCk9REGI1mli2upvbz+tpDRrXAKwPzRwHGY1Bbm0ihgdWOo12hT0/WlXBcuW8HfWyrLcu3AdVDHY69PKNN9Kfl5twwAIYgEFhKsJGusEbaHX0pZ4hxm3/AByYl7YyIpUHtm/m0+LQbes+0YrYDMb31jadGobhk2Gmk7JwDH+IL5Ksnw/w5Etl0B3YL0Osz5vSKPY2LQdPFsIioBLQchmACubUZdhFduJY7IUuDxGnyqFJyGdQWGwB2zR1FAuM4pr2HW6iAPoQRcAKPMTmXR9J0Omo0plVkp6bmJp5qhFxYQhjcJh1VHdLZfYvmyEjuuQEGRrlpM5n/gkA8O9czblJUyuxjMJofzxzOCqqQMyjRRtPc+gpP4ZwnGYmbluzdujUlwpiRuAxgH2BoFpGrxchtpN1Gs9GxzH66S0+S+BcOu2tQb1wGWzA28onQROvrrTbgeV8EG8uGtSD1Gb7MSKo7lm7ikdvDeP5sjbGOn3PQ9dqvfh9hGsK9nMhYK5IAJ2BKy4IHbanC6PYgEev8TPiKtRhm7Rte8/eTcdxG3ZuW7RV81zRMttmHzIEAD7Vvi8N4nlJZQCrZlaCSDMe3cdaiYm87gjK6Ab6rJE9N9/agvEub0wqGbV0iIWAzCRpBPQ05sSgOux7jMSUGb5N/GJnEbFu3isTZZmWSGtoLZcKCQdCplWBGnSpPCudcQ6Nbv2Ev2wBLOIG8ecxl1Om1K9nibYm/dxWIzJBGkaeGJlYbQkzHz6V24bdV1ueW4924+ltWIRQpz+YjW4RJgRAjpNIAK6+/wAzs9krDjF/esZ8LixcLFrWGUPbHhLaVcq3JJIdzEmDrEz03FQsemJVhvbNoMVKwRdliELabTtp7+m2JJFm2yrcsnNJaFPlgZhrlMGIGmsmiuF4qoto14O5JICEKNvhaF8qe2utCKljpKGGW91WA8Lwi/iTcN7EXiQAQSWZTEMwgbnQwB9KkXh4SstlFItqEfxNEnsAol7msnaJ70b4dxA23JbVSCYmTrET3gSBsT6104qmHebwFx22yITA1DTkkDfcjXSrzE63jGQq1iundtEbG4Fr3hqXN64snKudvDAJJAB3b1PQAAdoPD8KpvrfTP5WzHPl1gz8Q20jvTEmGuuzKlpwvRYVIHrvm1Oxmol+1ctgK2bTXLBEAakAkiPXSqWqbWjGoI3DaEOd8WmIs2woLHMxYgxkVVks3b070rYbivhGxiHOWQwFogswggAwxgKVOh/2mp/GMWr4WScgZiDH5ZEHQ7CTIE/0C3x97ZNq1Zjw7aliQfjY+Z2nroI+VORA08xi8G1CplO3IyVj+Itfxtu8gyaAkL+VWJ076H7Vb/A+O2LoXw2DdD0M9ZB2PpVV4fEWzdZlIti34aJr0ykvmI1+JiJ/aiXK1y6157o0BOQpkgeX+doA13179RSsXRypmB1E6mDpFqQVpZfHbishCx2NV1hOK5bps3CIGinsO3TSnHiKothcxJIAOYGNY771UnHMTOJJB0gfqaz4FmdyW6QagCDSWRCdq9pMwnH7yoqgiANJmsro5DAzQ3zPyxcs3fFtuPDkTA21119ia6PfLq2WSfIog6zIE67GNY2023qyuM4YFTpuCI7z+tVFzA7YcZraw63JVpJAyyrJl2boQT001rIvzZG35XmyhXzLDHAh/C4vOX1yyrgjVCPMG7Cf6U2nnVjbLHDsAJAuSpQnQaCczEkwBGp7UnWeJplVGjPlOdmA8zamQN48rb+3StsUCyZVYSEa8oYgakkWlJG7ASffbYVYFRWOU2HSPelTrEFxc9e6T8Vjkulbl2413zkwBA28oVSukGfNpOkUaw/MPhWgUVbqCPLnGZRMaDcjbSk1sOVCg3CoIk+VFJWIbLK7EwJnWda9w+FRMuhnNDIGUzBnUAbgUOcj5Y9sOrqAdh77ow4fGC6WawfAAVzDNEmPKVBHqdATvsNqy81/FqLVzEZAGzG3lJOXNK5vMPMIk5tB66UIuWLpZ7gtKltCCxJEicpE9QO3vXv/AFgasADmdrjZ95kdQxkSxgE9Ceuj1TSKdP8AHceBI84XucPtW0AfMIJhjqXkEBFYyFYzOaNIIiljj9lrduCigLmynxUPUFgAYYNqN99hXvEuLBC63gDduFfMT/7YILBlIzHqBG1AX4taAJWM7W2BIUzm2ALEkMSJkwInT1ELytDVGHETePXKvE0xOEuYa/lZUIG5GnxHUanX9YodzDxoWrZXNlGyjqT3pP4PxwYe0/UkzqdAdvn0+lMPLnJN3GRicYTZwx80sQHuL0idLaa/EfkNZpBoM7WbRR6zFUK03LHnrbvhH8OeQExSDHYyXUn/AE7Z/mCn427rI0XYiSZmrG4hjRYtAEAAAgIieUDYAdoEaUSwKW1tW1tQbYVVTKQRlAgQR0iueNuKFJaIHetlVWKcJtOaa2d7sL90qbC4u0L7NAU3DOqxBjYdASRPz+VWVwTGolgu2iqqkx3InSqy/EC5bJV7TK0PDRJ0IPXtP6+tNfKgOIwtsT512Mg5YLLm10YwBv6+lYrsqBhqRp1myqFca6Cbcz/iFYw/wiXiVBaBr3A1+VKfGuZ8ZiEsG28Wbyk3EtiCBmKEEmSw01j9qfeO2bSWGVkF4qAJdFuM7Rp5dBm69AKSsbbv3crOmTIxRSNZTVdlGmo0G5y0xwyC7an0+g/MxPjES3ZLt11i7bXxbl1iQ2Xy27eysZy6nQgEx01noNaI8tYQ27jPBVwArQCsbmACDmII7RrU7BWCt3LctgaSrRGYdgSNZ6g0x4TEJbTyWQzAkTGZh7TOnoKJGDL0mz/lUy2t/ErPG8XuveCM2QKxUuRnuRJOgJ1nQadhTPgOZbaA24/0rY1NyS9xmLZQB0MjeYgbUU5ntEqLjsfTygldzEjbfbWhdpcMLHiXr0MWUqttbYY5ZkyUOTcSRrtQMwY5I7D/AKmlVghU3PTW3h7+8ODFKUtr5SzMpIUkgDWAveTOvYGjj4iwC9swGgCRImQNiNREj61XXHeK2L4Dq6rkK+UZgTr/ACmNYA6DbtpQri3HbbnMviBtNQYGnZSfbX0qIHM6Rw2e1yR94ycSZrBPndSSNWvK4klgNG6eXvprNQMTxR8wOI8MoNjrmn0VWMe8ClS1xQI4eMzSTmYk6kQdAQOs1Ax3EiTJJJpi0STHt2dMXc/eTuN8WNzcwIgD7me+v6ChOBGZgkxPp9z6VDuuWOtO/LvLTPYzlgvYMJEa7g994HatDslBOIzm1n+JfhGgkTlqwGvxb8yfztlnTckD4pP771b/AAnhmHRluogBC5Zg+53OlL3JvLyL5wxbXcQJygDQDZZnT9d6acRiwi6aenQVya9c1allPCPWLrHKuUb90Ac3YqEMECenp/Wqdu3y91mHeB7DT/Pemvnnjh8wkSTCx9z9KUOF25IiPnXQwdOylzznPqHW0MWmMDy1lHMLwvEMgZbTEHYyP3rytV5LS72UXiQNgaD8w8m2cRayGUYHMrruG3n1oHy/xq5hLnh39bROl38pOgzenr/gfRiVYCDvWdQpHF80A5qZ02lIcZ4bdsXfDupqcy27wJiCsHXQySNRvRlLdq8itIOVUJldmTMFbKw1RlYg6aESQIp/4vwtboNtwGDA7x/gqvMZyXfwjG5hrjOgBhB8S/L+bTT+k61XaX0ab8PXHW3v3+YPxmPZLoWFNxlAXzQoX8xPz2EnpuamYW0ltUclEunMc7CWJgkM0kKGEny6x6V5/wBVKL/q2l8hmQDGwU+QnyH2016mKHnieHzi490EglgIbU6wCCGhdvTfSkMpNwOc7KHMNvpz99JKyi1duXMniZIQNdJlmaFzMZkAZh84ofzDctEJLlWGdXCgKGYMAGGhhAZgdcm+tSsTxW01q42b4szBogM8hssbxKhaTnx7nNJLM32mQYHeDHtpTwLkQFU/M07YzEoozI7lwxBzBCIMHcfEcw66UJu32JgSZgAAb9AABuaOcI5Vu3Wm7Nq2BJMZm1BI8g+HWJzRE9YpowvDLVpQq2iFJmS+YgnRbhkeQeXcaAyKMuFsBrEHM5NtB1kzkvk61YX+IxaJdcQBbaPDtdSWkHO2m42133qfxnnnEXPEW3lCLIYhfKAO7OsT6UM4fxS7eW7YZrjNEOQARbtgSGCiADmJ16+tFcFhbrKmGT/21y5oChmZixzOWMdAWgE67bUm7m9/f4mJ6aU2uwBPfBWF45inurYXFOc40FsqxWBrrlAA0+U/Ku3GEUAm87OyiJZ2YT1AQmG2iSIkbb0x2+XTh7eSwud2nOywIOgAWSIAGmkfKhp5EvXVGd8pJ2gGBr1BifTaksQ3Ct/KczFYh2bLT0HUaRBu3rbeRZSQFGq5d5EgABemtPH4b4gW85mQwAj8skT9h9qlXOQ7VoAllMA6kamTqSev0pJwDHD4o2pyzcFssdfIzAZv+JmmBW1Xz1h0izIVY3l0W8GCzOrDz6Sdh2C9zv8AM1xxHA0aAzsQJBURlOmmhGhG4Ig61Px161YsqzghFIAhWbL2MKDA9dhUPD8StX0N23clFJzEysEbghgDFPcf5TKtKwvaV/zNfv4MhW81vUBmAII3gnuN4Pagh5rdkCpmHYhj/Tf5zTnzdwpxgbltHe8C2Y+IFZktz5gsKC5Akgb9OwqlMVg2yLcHwPIBGgJWARHQjT6ilrh0bnGLgc9ypjJjeMuQTcukxqFJH0A71Bv4tLwTPbNsqsM4c+bUhVymQI+U695oF/BnQxuR99J/zvRocu4jw2uQuTMozlkUAkmAQTO6kTtNPSgijSOoK2HNxO3DeEq4Jl2BBUFcoyPofMJJK5TOw2O8RQ29hRbfLcdWjfw2nsCJjf8AautzDsiBywWVOUZjmjbtv/asTDG7aVQmtsEu2ZvMBsDm0ECYjv2iG5ROgteqTrIF+5blQobtuCTqI0A7TpUu1w0Af6oRDIJDuwYj0UA6+/5hXfheEAaQ2oKkhd+/lgHT1qRew1lnyD/UuEgCBJZusiZBn5VCwEsKWPFI3DsAty4fDyEATlPzJiNTt9xrO9k8B5fxFwKphLQMs0GSB0Uba9+kdenPkrkxky3LyIhXYCJYbjNuBG2n608YjGhV7R6/vXOr4gMbDbr9pbVTTBC+/vIwW3ZGVBlUab79NunTWlvmPiUDQb+sV34xxlds3+fKkXnDjq5Bk0aCoBM6zuNNBHvtWSjSLPYc5lZ9LmKPHL5u327DQf1+9EOCYEuyqokk+0etBcIsn1p/5Iw+rMInRRPr/gruNwrYcpnQXN464LCsltVUtAAA1rKE4vmK3bc2y0lTBIiJ61lKsYzMOsYb1kEEEA+h1n96F/xd/CMHtAvaGptzqvqvpHSp9m9IHepKr3j3pBW8Z4zbhfN9u5mIbWB5W0Pr9KYuEXlu28xM1XfFeWgxNy2crfaflt71BwXHsThJtupZfofkdjSwrIb7jpAZARppLI4ny1hrynPbGvUSCfodaQuYOUsPbmL5Ty5QrAPEajcSNQPpTJhudLbqchEhCQDoZA2PrNVdzFx6XJLZmJ23mllizZaOh5/6j6DVF+Y6SDxvFz5CqqttnhxPmBgBQDsNNt6mWOAeCuHv3nKHMHNuOg1WSGDZtjERvv1h4S49p1vFZvLLAMsra0BBAOjXNZ1mJGkiufEMXfuk3HzOSJLN233O1bGzHTnOpRphhmqHh6X1841XuZbQ8ykBgPykA6j4kH8wE6g70F5g5tuXMoW7cfKMua5lMidgsQAes79aAYTDNdzQTIGgAJLHsP1n0o3h+DJ4KuFZrgOVkClhrqpkDcydOymNjUACCW7Kx4R5mdOScLfcv4JIdxkHmIgHue2k/p63JwTgNvDAGZuZcpbUzGsSemvzqNydy8LNsOyxc66QAYiY7gfcmjeMmIikYivkpl7eE4mJrXbID4za3eiYie9SrKseoP8AnbpQlF6E0UwKxWX9OxFR7IRYTG4nPFWFKk/59apXn/hzpixcUHKwVlI2LIdR+n1q7sXdQQpIk7D71Vv4lW2yBgTC3AfqCv610WIDAjwPnCpA7S1eFYjxbKP+ZQdPXWuOLNmxbLMEtrudABPy60jcs86eDgbcoXuZykZoAAynMxAJAAbtOlIvMuPx3EbpDOCiBmKWZhF76mCTtuSTpEkCmZxltz74+nhHclv2+/esbOZPxHso4tWEN1juRIEfSSfl86T+BXFSw3i2xdh2YWnaAGyiWIXzHSBA3jUiKlcL5IxbMGtWDaXebhCg/WXP0plwv4ZMxm/icszK2V6GNM7/ADny9aScvIzYnZ0RYmLIxtg2giYfCrC/6l0q8sTGiSQUYHsWEjtQPjHHkzf6NsLAy6M5VgNmhjInsIGtWxZ/DnCJAm4R1LNqRG0rAj5USwXLmBskeHh7ebeSAxnpqf1q+311X36wO0pAXUkmVVwXkjFY5lu3SEtkAx/NH5QsaaCde43p9s/h9aClGjKd8zOfbyggfU00XOIohgR7ChWP5gX8wHr+tYqtUsbsx8AbD7+sAVn/AGicMLyXg7Jz5SzDuQo/4oFH1mthgMFabNbsWkcfzKozA/8AdvQLH8yid+h07npS7iOOMSdexFAXZtANJCXPzNH/ABnGlUeYgUm8wceDHyk0q8S42F+JpPbc0t47iFy6dJA7d6dTwRqattF9qE2hniXHQJg5m9/1pfe41xszGTXTC4AtsKZOEcr3GhohPzHr7DrXSRadIaRRzOdYM4Xw5mYBYk9CY/WmnH4tcLbFq2ZuGCxH8v8Aft2rpjeKWcMpt4cA3CIZ/wAp+mp9OlJ1+6SSSZJP+GqF2NzLJCiwm7XCSTNZUFrpnQSK9pmUxOYS77CjQo2Yaddqm2zprpS2XKkMDEaf4KJYPitsmGAU950P7VjvNkKuwOmtRnwinylQwPSBFSEg9iI6RW6rpp+//moRIDIfDOSbN254jSLa6lQSMx/LI1A7waN4rlrC5SosWgDOqqFIkESHHmBg7zXlriQtWwsdTJ+810scVW5Oogb67DSKS7rex3i+MG8U8VydbCsFZnM6ZiMwjQAH2gfIUo4y5dF1yUZPCKuQbcDTU+Uggnt012Iq6cGLZE6b1rijbaVOX5xVhmFmJBmhMWQMpEo7h2IhsmYwxPmUhTDEyfLGhB+lOvKfMFvDG4qWNgNcwzAxqsnZes012+XbBZv9Ma7/AEj5VFv8nqGL2nCOQdSPaNj0/rQ5mz58pHgf6j/iKTpkY6ef9QNhfxGvh2P8KPDLABM5Vx1LQUhtNflTJY5zwl9/CF1UfqHJAPTysQAfalLi/JmOLM63bbExJzODptq0+gjaJoJb5LxaKVNoH3KsCZJ7yfnAmO1O7YBLHY9YpsNQfUHXuMtm6UXd1jeSRQ/F834CyPPiEJ7KZ/SkFORL+QZoZoHlLMqqeoJX4h7AVrhvw1xGYlhhhII22MzIlPl7E1looisbH0vB+FpD5m/qM1z8TLFwXDbtF0t5czEgaEhZHzP3+gvj3G8JirRtg5HuLKg/MrqNJ0mN4ivcL+GZg+LiSAdMlpQi/wBSdfapuE/DXDIwZtY7yddhoTE+sU9mJ01PkPxCyYUDQ2Pn+YC/CzK94BhIAJg9yMp066fp6VZuIZEYwoBHYftSHcwtvBY9RaGVHtqygydQSrfUCf8A5V35648yOUUxoJPfSqrMAL21vEMpYix0tGi7xtBoDLdh/mg9aiY7mG2mbzAwPnPSqdvcfIJ8+p31qLf46I1efnQhKrcoOVRLO4hzYFAgmexj7xQa/wA3PELAnrufqarq5x0dJNRrnF3Ow+tGMG53ldogjrieOOxksdupqBieL6atp7/52pPuYi627H5VzNpm3k05MCo3Mo1jyEP4njidNfahl7iVx/h0H3rXC4Anp9KbeD8nPdElcvZjp9t6dkppygjM0T7eDZzOpPeifDeGFnCFTm7RVg4TlS3Z8164IHVYAj1JqHxjmrDWgUw9tWP5ht9f5qnaFtBLyBd5O4by5as2xdxBCkbSRA7Zvzf5vQTmDnAupt2BlXYvsT7flH3pbx/FL18zdctGw6fIVCL1YTmZRqaaT0vXEyxyjr9q1LEmBvRLBYXL79TTlXnM7Pae27AAAryiC2qyjiY3OO50/wA9KiXSKsrjHLKXJa1CP1H8p+Q+E+o+lInFeH3LRKuhU/Yjup2NYXosnhOilZX8ZDw3Frto+RjHajWB5mRoFwFD+Yag+4pVuT2j71wM9hQCMIliXb63bZyupmYhhPaN96T8bwzF4YHwZMkGZMZeoNvqfsKCm8ynMhykdV0ojhea8QnxFXGnxDWN9xH3qyoO8G9p0wvOl2ySLqGDoSmo94Oo+9EcLzraHmZwM0EFtNaiXeM4S+P9a0yNtKwfvv07GoWO5fw18A276yuysVGn2J+lJOGpk8x4S8xlh8I5mDIGzqZkmDPXvNTrfMiFiCdNYgb9tapO/wAt4qzJtM0H8p39dKi2+MY2wcrMWA3Vx/XcVPhqg+R7+MA5eYl14vmlVMCTtrUjDcxW95Hzqkb/ADfdP/2lDe5I+kVxPNl/oqD60K4bEbm31kLU5duK5sUMYiAPr7RUPDcyszlmuKB2G/3qnDzTfOwQfX964f8AX8Seq/If3ovhax1JlZ0EuniHNunkAn13rU80/CTEncCdP71TDcw4juPp/evP+u4idGH0q/hKu5aTOnSPvOnFmuXLNyCAuYA9vhI06f2pf5hwr4r/AFbbuzAea2TpA0lT19vpQZ+J3LsZyDHYEb0X4RfKkMDsaelNkAvvCVgRblFv/pDzGUg9iKnYXli8+gRp9iPudKtXC5biK5IE7/1ruqQNGqzXaX2Cysv/AEdfH8mn/cv71LwnKDT5sv1P9BVgX7qqNT85FDb/ABzCpOZ1n/kftQ9q5hdmgkPA8p2APOW98oA/5azRXD8rYMdJ92JHzil3E8521kWw7f8A8j+tBsZzbff4YQem/wBTVhXMEsgj5jMJhsOswtsfmJEH57mlrG84LbJFkFj3Oi/uftSdiMSzmXYs3ckk/euBemLTtvFmqdhCHFOMX75m7cJHRdlHso0+smoBOlc2uVxLztTQsUWklrulckDOYFdrGAJ1bT0opZw4GgFGFtFM/ScMJhAvqe9FMPh5rphcITRrB4GOlMAvFEyKmE0r2jq4XSso8sG8teuWIw6XFKuoYdiJrcGvZqSRJ41yNMth2j/Y+3yb9/rSRxDAXLLZbiMh6SND7HZvlNXZXLE4dXUq6qyncMAQfkaQ9BTtpHpiGXfWUFiEIJ0qK4q2OMfh/Zua2WNo9viT/idQPY0kcY5PxdnU2w6/mtn+h2+ppBosJoWupi0w614r17e8phgVPZgVP0Na6UJEMETrbxTr8LsvsSP0rq/EbjCGIYf7lU/eJqIQK8zetVaXee3LCsZyge0/3rm2CUdK6Bz3+1eG7V3MrScxg09fkB+4rpbwlobz/wAf714bvpWjXqu5laSWuHw0al5/7f71q1vDdM//ABWo3i1ya5U1kuJJY2QNA0+wj6TWgxMbAVHzCtGerlXhnD8xXkXKpUCZ2H9a4X+YMQ291vlp+lCTcrmzzUyjpKLmSLt8t8TE+5Jrhm7Voz1qXowIJM3L1rnrkXra3YdtgaILALAT1rla5p0FTbXDZ+I/IVOs4ULsKILAL9IMs4Bj8Wgojh8IF2FTrOEJ6UTwvDO9GBFkwZYwxOwophOH9xRbDYADpRnAcJZz5V+fT60YWDeCsLgfSjnD+Eu+w07najuB4CiwW8x7dP70YUQIAijtKgu1wK2AAZJ71lFdaypJJC16aysoZJi1lZWVJJlaNWVlSSKnNGEtloKKRGxUEfSKpjjChb5VRlE7DQfQVlZSn2MYm88Q13G1ZWVlmwbTS5vUfvXtZUkM1PStGrKyoJJ5Wj17WUUozWtGrKypBnN60rKyiknI1r1r2so1im2hXB2xGw+lTlrysphiZ1QVNwyidqysqxIYZsKNNKJWRWVlMEGFeGIC6ggETToqgCAIrKyrMk2WvaysqCSZWVlZUkn/2Q==" />
      <div className="mt-3 flex items-center justify-between">
        <p className="font-semibold ">{name}</p>
        <span className="flex shadow-lg px-4 py-2 rounded-xl items-center">
          <button
            className="mr-2 font-bold bg-red-400 w-7 h-7 rounded-full cursor-pointer"
            onClick={() => {
              removeFromCartItems(item);
            }}
            disabled={(quantity === 0)}
          >
            -
          </button>
          <p>{quantity}</p>
          <button
            className="ml-2 font-bold bg-green-400 w-7 h-7 rounded-full"
            onClick={() => {
              addToCartItems(item);
            }}
          >
            +
          </button>
        </span>
      </div>
      <div>
        <p>This is the description</p>
        <p>{type}</p>
        <p>Price:${price}</p>
      </div>
    </div>
  );
};

export default FoodCard;
