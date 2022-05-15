import { useEffect } from "react";
import { api } from "../../services/api";
import { Container } from "./styles";

export function TrasactionsTable(){
    useEffect(()=>{
        api.get('transactions')
        .then(res=>console.log(res.data))
    },[]);
    return(
      <Container>
          <table>
              <thead>
                  <tr>
                      <th>Título</th>
                      <th>Valor</th>
                      <th>Categoria</th>
                      <th>Data</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>Desenvolimento de website</td>
                      <td className="deposit">R$12.000</td>
                      <td>Desenvolvimento</td>
                      <td>20/02/2021</td>
                  </tr>
                  <tr>
                      <td>Aluguel</td>
                      <td className="withDraw"> - R$1.000</td>
                      <td>Casa</td>
                      <td>11/02/2021</td>
                  </tr>
              </tbody>
          </table>
      </Container>
    );
}