$( document ).ready( function() {

  $.when( $.ajax( { url: "https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=7605" } ), $.ajax( { url: "https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=1182" } ), $.ajax( { url: "https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=5324" } ), $.ajax( { url: "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD" } ), $.ajax( { url: "https://min-api.cryptocompare.com/data/price?fsym=ETC&tsyms=USD" } ), $.ajax( { url: "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD" } ) ).done( function( resp1, resp2, resp3, resp4, resp5, resp6 ) {
    // Setting variables for the information object I need as well as prices
    var eth = resp1[ 2 ].responseJSON.Data.General;
    var ethPrice = resp6[ 2 ].responseJSON.USD;
    var btc = resp2[ 2 ].responseJSON.Data.General;
    var btcPrice = resp4[ 2 ].responseJSON.USD;
    var etc = resp3[ 2 ].responseJSON.Data.General;
    var etcPrice = resp5[ 2 ].responseJSON.USD;
    //Array of said prices. Bitcoin (roughly) has a 1bil hash difficulty scale.
    var set = [
      [
        btc, btcPrice / 1000000000
      ],
      [
        eth, ethPrice
      ],
      [ etc, etcPrice ]
    ];
    //Areas appended to in HTML
    var area = [ "#day1", "#week1", "#month1", "#year1" ];
    //Event listener that runs the calculation function
    $( 'button[name="hashBtn"]' ).on( "click", function() {
      //Remove table data, for neatness
      $( "td" ).remove();
      var userHashRate = parseInt( $( "#usrHsh" ).val() );
      if ( isNaN( userHashRate ) ) {
        alert( "Please insert a hashrate" );
        return null;
      } else {
        console.log( typeof userHashRate );
      }
      //Double for each because it was easier than double for loops
      set.forEach( function( v, i, r ) {
        area.forEach( function( val, ind, arr ) {
          //Setting variables for the math function
          var time = [ 1, 7, 30, 365 ];
          var name = v[ 0 ];
          var price = v[ 1 ];
          var blockTime = name.BlockTime;
          var blocReward = name.BlockReward;
          var netHash = name.NetHashesPerSecond;
          var num = 0;
          var hashes = $( 'select[name="hashes"]' ).val();
          var userHashRate = parseInt( $( "#usrHsh" ).val() );
          //Value of the "hash rate" in h/s kh/s etc
          if ( hashes == 0 ) {
            var num = 1;
          } else if ( hashes == 1 ) {
            var num = 1000;
          } else if ( hashes == 2 ) {
            var num = Math.pow( 1000, 2 );
          } else if ( hashes == 3 ) {
            var num = Math.pow( 1000, 3 );
          }
          //Hooray! math!
          var sum = "$" + ( ( ( ( ( ( ( ( blocReward / blockTime ) * userHashRate * num ) / netHash ) * Math.pow( 60, 2 ) ) * 24 ) * price ) * time[ ind ] ).toFixed( 2 ) );
          $( area[ ind ] ).append( `
       <td>${sum}</td>
       ` );
        } );
      } );
    } );
  } );
} );
