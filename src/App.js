import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Home from './page/Home';
import Movies from './page/Movies';
import MovieDetail from './page/MovieDetail';
import Navigate from './components/Navigate';
import ErrorPage from './page/ErrorPage';
//1. 총3개페이지 필요 /홈페이지 /무비페이지 /무비디테일페이지
//2. 홈페이지에서 배너 볼수있음
//3. 3가지종류의 영화를 볼수있음 (popular,top rated, upcoming)
//4. 각 영화에 마우스 올려두면 제목,장르,점수,인기도,청불여부
//5. 영화들 슬라이드로 넘기면서 볼 수 있음
//6. 영화디테일 페이지에서는 영화에 대한 디테일한정보 볼 수 있음(포스터,제목,줄거리,점수,인기도,청불여부,예산,이익,러닝타임 등등)
//7. 트레일러를 누르면 예고편 감상가능
//8. 영화의 리뷰도 볼 수 있음
//9. 관련 추천영화도 볼 수 있음
//10. 검색 가능
//11. 영화정렬가능
//12. 영화를 필터링도 가능

function App() {
  return (
    <div>
      <Navigate />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/movies' element={<Movies />}/>
        <Route path='/movies/:id' element={<MovieDetail />}/>
        <Route path='/*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
